import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IEventChatMessage,
  IEventChatCreate,
  IEventChatPaginatedResponse,
  ITypingStatusResponse,
} from '../models/event-chat';
import { environment } from '../../../environments/environment';

/**
 * Service for managing event chat messages
 * Handles CRUD operations and chat-related API calls
 */
@Injectable({
  providedIn: 'root',
})
export class EventChatService {
  private apiUrl = `${environment.apiUrl}/event-chats`;

  constructor(private http: HttpClient) {}

  /**
   * Get messages for an event
   * @param eventId - The event UUID
   * @param sinceTimestamp - Optional timestamp to get messages since (for polling)
   * @param limit - Maximum number of messages to return
   * @param offset - Offset for pagination
   */
  getEventMessages(
    eventId: string,
    sinceTimestamp?: string,
    limit: number = 100,
    offset: number = 0
  ): Observable<IEventChatMessage[]> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    if (sinceTimestamp) {
      params = params.set('since_timestamp', sinceTimestamp);
    }

    return this.http.get<IEventChatMessage[]>(
      `${this.apiUrl}/event/${eventId}`,
      { params }
    );
  }

  /**
   * Get paginated messages for infinite scroll
   * @param eventId - The event UUID
   * @param beforeTimestamp - Get messages before this timestamp
   * @param limit - Maximum number of messages to return
   */
  getEventMessagesPaginated(
    eventId: string,
    beforeTimestamp?: string,
    limit: number = 50
  ): Observable<IEventChatPaginatedResponse> {
    let params = new HttpParams().set('limit', limit.toString());

    if (beforeTimestamp) {
      params = params.set('before_timestamp', beforeTimestamp);
    }

    return this.http.get<IEventChatPaginatedResponse>(
      `${this.apiUrl}/event/${eventId}/paginated`,
      { params }
    );
  }

  /**
   * Send a new message to an event
   * @param message - The message data to create
   */
  sendMessage(message: IEventChatCreate): Observable<IEventChatMessage> {
    return this.http.post<IEventChatMessage>(this.apiUrl, message);
  }

  /**
   * Delete a message
   * @param messageId - The message UUID to delete
   */
  deleteMessage(messageId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${messageId}`);
  }

  /**
   * Get a single message by ID
   * @param messageId - The message UUID
   */
  getMessageById(messageId: string): Observable<IEventChatMessage | null> {
    return this.http.get<IEventChatMessage | null>(
      `${this.apiUrl}/${messageId}`
    );
  }

  /**
   * Update typing status for a user
   * @param eventId - The event UUID
   * @param userId - The user UUID
   * @param isTyping - Whether the user is typing
   */
  setTypingStatus(
    eventId: string,
    userId: string,
    isTyping: boolean
  ): Observable<ITypingStatusResponse> {
    return this.http.post<ITypingStatusResponse>(
      `${this.apiUrl}/event/${eventId}/typing`,
      { user_id: userId, is_typing: isTyping }
    );
  }

  /**
   * Get list of currently typing users
   * @param eventId - The event UUID
   */
  getTypingUsers(eventId: string): Observable<ITypingStatusResponse> {
    return this.http.get<ITypingStatusResponse>(
      `${this.apiUrl}/event/${eventId}/typing`
    );
  }
}
