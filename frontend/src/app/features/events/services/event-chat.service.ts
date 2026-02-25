import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  Subscription,
  catchError,
  switchMap,
  timer,
} from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IEventChatMessage, IEventChatPage, IEventChatSend } from '../models/event-chat';

/**
 * EventChatService
 * ================
 * Manages loading and real-time polling of event-chat messages for a single
 * event page.  Because the backend runs on Azure Functions (no WebSocket
 * support), new messages are discovered by short-interval REST polling.
 *
 * ### Typical usage in an Angular component
 *
 * ```ts
 * @Component({ ... })
 * export class EventDetailComponent implements OnInit, OnDestroy {
 *   messages$  = this.chatService.messages$;
 *   sendError$ = this.chatService.sendError$;
 *
 *   constructor(
 *     private route: ActivatedRoute,
 *     private chatService: EventChatService,
 *   ) {}
 *
 *   ngOnInit(): void {
 *     const eventId = this.route.snapshot.paramMap.get('id')!;
 *     this.chatService.initForEvent(eventId);
 *   }
 *
 *   send(text: string): void {
 *     this.chatService.sendMessage(text);
 *   }
 *
 *   delete(messageId: string): void {
 *     this.chatService.deleteMessage(messageId);
 *   }
 *
 *   ngOnDestroy(): void {
 *     this.chatService.destroy();
 *   }
 * }
 * ```
 *
 * ### Template snippet
 *
 * ```html
 * <div *ngFor="let msg of (messages$ | async)">
 *   <img [src]="msg.userAvatarUrl" [alt]="msg.userName" />
 *   <strong>{{ msg.userName }}</strong>
 *   <span>{{ msg.messageText }}</span>
 *   <small>{{ msg.timestamp | date:'shortTime' }}</small>
 * </div>
 * ```
 *
 * ### Polling behaviour
 * - Polls every `POLL_INTERVAL_MS` (default 3 s) while an event is active.
 * - Pauses automatically when `document.visibilityState` is `'hidden'`
 *   (tab in background) to avoid unnecessary cold-starts on the function app.
 * - Resumes immediately when the tab becomes visible again.
 * - Uses a `since` cursor so each poll fetches only *new* messages — the
 *   server query is a cheap indexed range scan even at high frequency.
 */
@Injectable({ providedIn: 'root' })
export class EventChatService implements OnDestroy {
  /** How often (ms) to poll for new messages while the tab is visible. */
  private readonly POLL_INTERVAL_MS = 3_000;

  /** Max messages kept in the local list before old ones are trimmed. */
  private readonly MAX_MESSAGES = 200;

  private readonly apiUrl = `${environment.apiUrl}/event-chats`;

  // ── public observables ──────────────────────────────────────────────────
  /** Ordered list of messages for the current event (oldest → newest). */
  readonly messages$ = new BehaviorSubject<IEventChatMessage[]>([]);
  /** Emits the most-recent error from sendMessage / deleteMessage, or null. */
  readonly sendError$ = new BehaviorSubject<string | null>(null);
  /** True while the initial page load is in flight. */
  readonly loading$ = new BehaviorSubject<boolean>(false);

  // ── internal state ───────────────────────────────────────────────────────
  private currentEventId: string | null = null;
  /** ISO-8601 timestamp of the last message we have received. */
  private cursor: string | null = null;

  private pollSub: Subscription | null = null;

  private static hasVisibilityListener = false;
  private static currentInstance: EventChatService | null = null;

  private static handleDocumentVisibilityChange(): void {
    EventChatService.currentInstance?.handleVisibilityChange();
  }

  constructor(private http: HttpClient) {
    EventChatService.currentInstance = this;

    if (!EventChatService.hasVisibilityListener) {
      document.addEventListener(
        'visibilitychange',
        EventChatService.handleDocumentVisibilityChange,
      );
      EventChatService.hasVisibilityListener = true;
    }
  }

  // ── lifecycle ────────────────────────────────────────────────────────────

  /**
   * Call this when a component mounts for a specific event.
   * Performs an initial load then starts background polling.
   */
  async initForEvent(eventId: string): Promise<void> {
    // If we're already watching this event, nothing to do.
    if (this.currentEventId === eventId) return;

    this.destroy(); // stop any previous session
    this.currentEventId = eventId;
    this.cursor = null;
    this.messages$.next([]);
    this.sendError$.next(null);

    await this.initialLoad();
    this.startPolling();
  }

  /** Stop polling and reset all state.  Call from ngOnDestroy. */
  destroy(): void {
    this.stopPolling();
    this.currentEventId = null;
    this.cursor = null;
    this.messages$.next([]);
    this.sendError$.next(null);
  }

  ngOnDestroy(): void {
    this.destroy();
    document.removeEventListener('visibilitychange', this.visibilityHandler);
  }

  // ── public API ────────────────────────────────────────────────────────────

  /**
   * Send a new message to the current event.
   * The auth interceptor adds the Bearer token automatically.
   * Returns a Promise that resolves to the created message, or rejects on error.
   */
  sendMessage(text: string): Promise<IEventChatMessage> {
    if (!this.currentEventId) return Promise.reject(new Error('No active event'));
    this.sendError$.next(null);

    const body: IEventChatSend = {
      eventId: this.currentEventId,
      messageText: text.trim(),
    };

    return new Promise((resolve, reject) => {
      this.http
        .post<IEventChatMessage>(`${this.apiUrl}/`, body)
        .subscribe({
          next: (msg) => {
            this.appendMessages([msg]);
            resolve(msg);
          },
          error: (err) => {
            const detail = err?.error?.detail ?? 'Failed to send message';
            this.sendError$.next(detail);
            reject(new Error(detail));
          },
        });
    });
  }

  /**
   * Delete one of the current user's messages.
   * Returns a Promise that resolves when the server confirms deletion.
   */
  deleteMessage(messageId: string): Promise<void> {
    this.sendError$.next(null);
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.apiUrl}/${messageId}`).subscribe({
        next: () => {
          this.messages$.next(
            this.messages$.value.filter((m) => m.messageId !== messageId),
          );
          resolve();
        },
        error: (err) => {
          const detail = err?.error?.detail ?? 'Failed to delete message';
          this.sendError$.next(detail);
          reject(new Error(detail));
        },
      });
    });
  }

  // ── private helpers ───────────────────────────────────────────────────────

  private async initialLoad(): Promise<void> {
    if (!this.currentEventId) return;
    this.loading$.next(true);

    return new Promise((resolve) => {
      this.http
        .get<IEventChatPage>(`${this.apiUrl}/event/${this.currentEventId}`, {
          params: { limit: '50' },
        })
        .subscribe({
          next: (page) => {
            this.messages$.next(page.messages);
            this.cursor = page.nextCursor;
            this.loading$.next(false);
            resolve();
          },
          error: () => {
            this.loading$.next(false);
            resolve(); // don't block polling on a failed initial load
          },
        });
    });
  }

  private startPolling(): void {
    if (this.pollSub) return;

    this.pollSub = timer(this.POLL_INTERVAL_MS, this.POLL_INTERVAL_MS)
      .pipe(
        switchMap(() => {
          if (!this.currentEventId || document.visibilityState === 'hidden') {
            return EMPTY;
          }

          const params: Record<string, string> = { limit: '50' };
          if (this.cursor) params['since'] = this.cursor;

          return this.http
            .get<IEventChatPage>(`${this.apiUrl}/event/${this.currentEventId}`, { params })
            .pipe(catchError(() => EMPTY));
        }),
      )
      .subscribe((page) => {
        if (page.messages.length) {
          this.appendMessages(page.messages);
        }
        // Always update cursor if the server returned one (even on empty poll)
        if (page.nextCursor) {
          this.cursor = page.nextCursor;
        }
      });
  }

  private stopPolling(): void {
    this.pollSub?.unsubscribe();
    this.pollSub = null;
  }

  /**
   * Merge new messages into the local list, deduplicating by messageId and
   * trimming to MAX_MESSAGES so the DOM doesn't grow unbounded.
   */
  private appendMessages(incoming: IEventChatMessage[]): void {
    const existing = this.messages$.value;
    const knownIds = new Set(existing.map((m) => m.messageId));
    const novel = incoming.filter((m) => !knownIds.has(m.messageId));
    if (!novel.length) return;

    const combined = [...existing, ...novel];
    // Trim oldest messages if we exceed the cap
    const trimmed =
      combined.length > this.MAX_MESSAGES
        ? combined.slice(combined.length - this.MAX_MESSAGES)
        : combined;

    this.messages$.next(trimmed);
  }

  private handleVisibilityChange(): void {
    if (document.visibilityState === 'visible' && this.currentEventId) {
      // Tab became visible — immediately poll once to catch up, then the
      // regular timer will take over.
      if (!this.pollSub) {
        this.startPolling();
      }
    }
    // When hidden the switchMap inside the poll timer returns EMPTY,
    // so no requests fire — no need to stop the timer.
  }
}
