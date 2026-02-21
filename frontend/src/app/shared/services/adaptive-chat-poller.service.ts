import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, firstValueFrom } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventChatService } from './event-chat.service';
import { IEventChatMessage } from '../models/event-chat';

/**
 * Adaptive Chat Polling Service
 * Manages intelligent polling for event chat messages with dynamic intervals
 * based on chat activity and tab visibility
 */
@Injectable({
  providedIn: 'root',
})
export class AdaptiveChatPollerService implements OnDestroy {
  private destroy$ = new Subject<void>();
  private currentInterval = 5000; // Start at 5 seconds
  private readonly MIN_INTERVAL = 1000; // Active: 1 second
  private readonly MAX_INTERVAL = 30000; // Idle: 30 seconds
  private readonly INACTIVE_INTERVAL = 60000; // Hidden tab: 60 seconds

  private messages$ = new BehaviorSubject<IEventChatMessage[]>([]);
  private isPolling = false;
  private lastMessageTime?: Date;
  private pollTimer?: ReturnType<typeof setTimeout>;
  private currentEventId?: string;

  constructor(private eventChatService: EventChatService) {}

  /**
   * Get the observable stream of messages
   */
  get messages(): BehaviorSubject<IEventChatMessage[]> {
    return this.messages$;
  }

  /**
   * Start polling for an event
   * @param eventId - The event UUID to poll messages for
   * @returns Observable stream of messages
   */
  startPolling(eventId: string): BehaviorSubject<IEventChatMessage[]> {
    if (this.isPolling) {
      this.stopPolling();
    }

    this.isPolling = true;
    this.currentEventId = eventId;
    this.lastMessageTime = new Date();
    this.currentInterval = 5000; // Reset to default
    this.messages$.next([]); // Clear previous messages

    // Start polling
    this.poll(eventId);

    return this.messages$;
  }

  /**
   * Stop polling
   */
  stopPolling(): void {
    this.isPolling = false;
    if (this.pollTimer) {
      clearTimeout(this.pollTimer);
      this.pollTimer = undefined;
    }
    this.currentEventId = undefined;
  }

  /**
   * Perform a single poll
   * @param eventId - The event UUID to poll
   */
  private async poll(eventId: string): Promise<void> {
    if (!this.isPolling || this.currentEventId !== eventId) {
      return;
    }

    try {
      const messages = await this.fetchMessages(eventId);

      if (messages.length > 0) {
        // Activity detected - speed up polling
        this.currentInterval = Math.max(
          this.MIN_INTERVAL,
          this.currentInterval / 2
        );

        // Update messages and last timestamp
        const currentMessages = this.messages$.value;
        this.messages$.next([...currentMessages, ...messages]);

        // Update last message time to the newest message
        const newestMessage = messages[messages.length - 1];
        this.lastMessageTime = new Date(newestMessage.timestamp);
      } else {
        // No activity - slow down polling
        this.currentInterval = Math.min(
          this.MAX_INTERVAL,
          this.currentInterval * 1.5
        );
      }
    } catch (error) {
      console.error('Polling error:', error);
      // On error, slow down polling
      this.currentInterval = Math.min(
        this.MAX_INTERVAL,
        this.currentInterval * 2
      );
    }

    // Schedule next poll
    if (this.isPolling && this.currentEventId === eventId) {
      this.pollTimer = setTimeout(() => this.poll(eventId), this.currentInterval);
    }
  }

  /**
   * Fetch messages from API
   * @param eventId - The event UUID
   * @returns Promise of new messages
   */
  private async fetchMessages(eventId: string): Promise<IEventChatMessage[]> {
    try {
      const sinceTimestamp = this.lastMessageTime
        ? this.lastMessageTime.toISOString()
        : undefined;

      return await firstValueFrom(
        this.eventChatService.getEventMessages(eventId, sinceTimestamp, 100)
      );
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  }

  /**
   * Manually trigger faster polling (e.g., when user is typing)
   */
  boostPolling(): void {
    this.currentInterval = this.MIN_INTERVAL;
  }

  /**
   * Slow down polling (e.g., when tab is hidden)
   */
  throttlePolling(): void {
    this.currentInterval = this.INACTIVE_INTERVAL;
  }

  /**
   * Load initial messages for an event (before starting polling)
   * @param eventId - The event UUID
   * @param limit - Number of messages to load
   */
  async loadInitialMessages(
    eventId: string,
    limit: number = 50
  ): Promise<void> {
    try {
      const messages = await firstValueFrom(
        this.eventChatService.getEventMessages(eventId, undefined, limit)
      );

      this.messages$.next(messages);

      if (messages.length > 0) {
        // Set last message time to the newest message
        const newestMessage = messages[messages.length - 1];
        this.lastMessageTime = new Date(newestMessage.timestamp);
      }
    } catch (error) {
      console.error('Error loading initial messages:', error);
    }
  }

  /**
   * Get current polling interval (useful for debugging)
   */
  getCurrentInterval(): number {
    return this.currentInterval;
  }

  /**
   * Check if currently polling
   */
  isCurrentlyPolling(): boolean {
    return this.isPolling;
  }

  ngOnDestroy(): void {
    this.stopPolling();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
