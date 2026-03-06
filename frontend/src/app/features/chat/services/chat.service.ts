import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, EMPTY, Subscription, catchError, switchMap, timer } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IChatMessage, IChatPage, IChatSend } from '../models/chat';

@Injectable({
  providedIn: 'root',
})
export class ChatService implements OnDestroy {
  private readonly POLL_INTERVAL_MS = 3_000;
  private readonly MAX_MESSAGES = 200;
  private readonly apiUrl = `${environment.apiUrl}/event-chats`;

  readonly messages$ = new BehaviorSubject<IChatMessage[]>([]);
  readonly sendError$ = new BehaviorSubject<string | null>(null);
  readonly loading$ = new BehaviorSubject<boolean>(false);

  private currentEventId: string | null = null;
  private currentGameId: number | null = null;
  private cursor: string | null = null;
  private pollSub: Subscription | null = null;
  private initialLoadSub: Subscription | null = null;
  private pendingSubs = new Set<Subscription>();

  private static hasVisibilityListener = false;
  private static currentInstance: ChatService | null = null;

  /**
   * Forwards the browser visibility event to the active service instance.
   */
  private static handleDocumentVisibilityChange(): void {
    ChatService.currentInstance?.handleVisibilityChange();
  }

  /**
   * Registers this instance and installs a single global visibility listener.
   */
  constructor(private http: HttpClient) {
    ChatService.currentInstance = this;

    if (!ChatService.hasVisibilityListener) {
      document.addEventListener('visibilitychange', ChatService.handleDocumentVisibilityChange);
      ChatService.hasVisibilityListener = true;
    }
  }

  /**
   * Returns true if the service is currently active for the given event id.
   * Prefer this over casting to access the private `currentEventId` field.
   */
  isActiveFor(eventId: string): boolean {
    return this.currentEventId === eventId;
  }

  /**
   * Initializes chat state for one event and starts the initial fetch flow.
   */
  initForEvent(eventId: string, gameId?: number): void {
    if (this.currentEventId === eventId) {
      return;
    }

    this.destroy();
    this.currentEventId = eventId;
    this.currentGameId = gameId ?? null;
    this.cursor = null;
    this.messages$.next([]);
    this.sendError$.next(null);
    this.initialLoad();
  }

  /**
   * Pauses polling without clearing any state. Use when the chat panel is
   * hidden (e.g. the user switched to a different in-app tab). Messages and
   * the cursor are preserved so polling can resume exactly where it left off.
   */
  pausePolling(): void {
    // Stop ongoing polling interval.
    this.stopPolling();
    // Also cancel any in-flight initial load so it cannot restart polling
    // after we have paused.
    this.initialLoadSub?.unsubscribe();
    this.initialLoadSub = null;
  }

  /**
   * Resumes polling if there is an active event and no poll is already running.
   * Safe to call even if polling was never paused.
   */
  resumePolling(): void {
    if (this.currentEventId && !this.pollSub) {
      this.startPolling();
    }
  }

  /**
   * Stops polling, cancels active requests, and resets local state.
   */
  destroy(): void {
    this.stopPolling();
    this.initialLoadSub?.unsubscribe();
    this.initialLoadSub = null;
    this.pendingSubs.forEach((sub) => sub.unsubscribe());
    this.pendingSubs.clear();
    this.currentEventId = null;
    this.currentGameId = null;
    this.cursor = null;
    this.messages$.next([]);
    this.sendError$.next(null);
  }

  /**
   * Angular lifecycle cleanup hook.
   */
  ngOnDestroy(): void {
    this.destroy();
    document.removeEventListener('visibilitychange', ChatService.handleDocumentVisibilityChange);
  }

  /**
   * Sends a message for the active event and appends it locally on success.
   */
  sendMessage(text: string): Promise<IChatMessage> {
    if (!this.currentEventId) {
      return Promise.reject(new Error('No active event'));
    }

    this.sendError$.next(null);
    const trimmed = text.trim();

    if (!trimmed) {
      const errorMessage = 'Message cannot be empty';
      this.sendError$.next(errorMessage);
      return Promise.reject(new Error(errorMessage));
    }

    if (trimmed.length > 1000) {
      const errorMessage = 'Message must be at most 1000 characters';
      this.sendError$.next(errorMessage);
      return Promise.reject(new Error(errorMessage));
    }

    const capturedEventId = this.currentEventId;
    const body: IChatSend = {
      eventId: capturedEventId,
      ...(this.currentGameId != null ? { gameId: this.currentGameId } : {}),
      messageText: trimmed,
    };

    return new Promise((resolve, reject) => {
      const sub = this.http.post<IChatMessage>(`${this.apiUrl}/`, body).subscribe({
        next: (msg) => {
          if (this.currentEventId === capturedEventId) {
            this.appendMessages([msg]);
          }
          resolve(msg);
        },
        error: (err) => {
          const detail = err?.error?.detail ?? 'Failed to send message';
          this.sendError$.next(detail);
          reject(new Error(detail));
        },
      });

      this.pendingSubs.add(sub);
    });
  }

  /**
   * Deletes a message and removes it from local state when confirmed by API.
   */
  deleteMessage(messageId: string): Promise<void> {
    this.sendError$.next(null);
    const capturedEventId = this.currentEventId;

    return new Promise((resolve, reject) => {
      const sub = this.http.delete(`${this.apiUrl}/${messageId}`).subscribe({
        next: () => {
          if (this.currentEventId === capturedEventId) {
            this.messages$.next(this.messages$.value.filter((m) => m.messageId !== messageId));
          }
          resolve();
        },
        error: (err) => {
          const detail = err?.error?.detail ?? 'Failed to delete message';
          this.sendError$.next(detail);
          reject(new Error(detail));
        },
      });

      this.pendingSubs.add(sub);
    });
  }

  /**
   * Loads the first page of chat messages and captures the initial cursor.
   */
  private initialLoad(): void {
    if (!this.currentEventId) {
      return;
    }

    this.loading$.next(true);
    const capturedEventId = this.currentEventId;

    this.initialLoadSub = this.http
      .get<IChatPage>(`${this.apiUrl}/event/${capturedEventId}`, {
        params: { limit: '50' },
      })
      .subscribe({
        next: (page) => {
          if (this.currentEventId !== capturedEventId) {
            return;
          }

          this.messages$.next(page.messages);
          this.cursor = page.nextCursor;
          this.loading$.next(false);
          this.startPolling();
        },
        error: () => {
          if (this.currentEventId !== capturedEventId) {
            return;
          }

          this.loading$.next(false);
          this.startPolling();
        },
      });
  }

  /**
   * Starts interval polling for new messages while the tab is visible.
   */
  private startPolling(): void {
    if (this.pollSub) {
      return;
    }

    this.pollSub = timer(this.POLL_INTERVAL_MS, this.POLL_INTERVAL_MS)
      .pipe(
        switchMap(() => {
          if (!this.currentEventId || document.visibilityState === 'hidden') {
            return EMPTY;
          }

          const params: Record<string, string> = { limit: '50' };
          if (this.cursor) {
            params['since'] = this.cursor;
          }

          return this.http
            .get<IChatPage>(`${this.apiUrl}/event/${this.currentEventId}`, { params })
            .pipe(catchError(() => EMPTY));
        }),
      )
      .subscribe((page) => {
        if (page.messages.length) {
          this.appendMessages(page.messages);
        }

        if (page.nextCursor) {
          this.cursor = page.nextCursor;
        }
      });
  }

  /**
   * Stops the polling subscription, if active.
   */
  private stopPolling(): void {
    this.pollSub?.unsubscribe();
    this.pollSub = null;
  }

  /**
   * Merges incoming messages, deduplicates by messageId, and enforces max size.
   */
  private appendMessages(incoming: IChatMessage[]): void {
    const existing = this.messages$.value;
    const knownIds = new Set(existing.map((m) => m.messageId));
    const novel = incoming.filter((m) => !knownIds.has(m.messageId));

    if (!novel.length) {
      return;
    }

    const combined = [...existing, ...novel];
    const trimmed =
      combined.length > this.MAX_MESSAGES
        ? combined.slice(combined.length - this.MAX_MESSAGES)
        : combined;

    this.messages$.next(trimmed);
  }

  /**
   * Reacts to tab visibility changes by resuming polling when visible.
   */
  private handleVisibilityChange(): void {
    if (document.visibilityState === 'visible' && this.currentEventId && !this.pollSub) {
      this.startPolling();
    }
  }
}