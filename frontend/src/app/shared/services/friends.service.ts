import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  IFriendRequest,
  IFriendship,
  ISendFriendRequest,
  IUpdateFriendRequest,
  IUserSearchResult,
} from '../models/friends';
import { IDirectMessage, ISendDirectMessage, IUpdateDirectMessage } from '../models/direct-message';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  private readonly friendsUrl = `${environment.apiUrl}/friends`;
  private readonly dmUrl = `${environment.apiUrl}/direct-messages`;

  constructor(private http: HttpClient) {}

  // ===========================================================================
  // Friend Requests
  // ===========================================================================

  /**
   * Send a friend request to another user
   */
  sendFriendRequest(receiverId: string): Observable<IFriendRequest> {
    return this.http.post<IFriendRequest>(`${this.friendsUrl}/requests`, {
      receiverId,
    } as ISendFriendRequest);
  }

  /**
   * Get all pending friend requests sent by the current user
   */
  getSentFriendRequests(): Observable<IFriendRequest[]> {
    return this.http.get<IFriendRequest[]>(`${this.friendsUrl}/requests/sent`);
  }

  /**
   * Get all pending friend requests received by the current user
   */
  getReceivedFriendRequests(): Observable<IFriendRequest[]> {
    return this.http.get<IFriendRequest[]>(`${this.friendsUrl}/requests/received`);
  }

  /**
   * Accept a friend request (only the receiver can do this)
   */
  acceptFriendRequest(requestId: string): Observable<IFriendRequest> {
    return this.http.patch<IFriendRequest>(
      `${this.friendsUrl}/requests/${requestId}/accept`,
      {},
    );
  }

  /**
   * Reject a friend request (only the receiver can do this)
   */
  rejectFriendRequest(requestId: string): Observable<IFriendRequest> {
    return this.http.patch<IFriendRequest>(
      `${this.friendsUrl}/requests/${requestId}/reject`,
      {},
    );
  }

  // ===========================================================================
  // Friendships
  // ===========================================================================

  searchUsers(query: string, limit = 10): Observable<IUserSearchResult[]> {
    return this.http.get<IUserSearchResult[]>(`${this.friendsUrl}/search`, {
      params: { q: query, limit: String(limit) },
    });
  }

  /**
   * Get list of all confirmed friends for the current user
   */
  getFriends(): Observable<IFriendship[]> {
    return this.http.get<IFriendship[]>(`${this.friendsUrl}`);
  }

  /**
   * Remove / unfriend another user
   */
  removeFriend(friendUserId: string): Observable<void> {
    return this.http.delete<void>(`${this.friendsUrl}/${friendUserId}`);
  }

  // ===========================================================================
  // Direct Messages
  // ===========================================================================

  /**
   * Send a direct message to a friend (must be friends for this to work)
   */
  sendDirectMessage(receiverId: string, messageText: string): Observable<IDirectMessage> {
    return this.http.post<IDirectMessage>(
      `${this.dmUrl}`,
      { receiverId, messageText } as ISendDirectMessage,
    );
  }

  /**
   * Get conversation history with another user (up to limit most-recent messages)
   */
  getConversation(otherUserId: string, limit: number = 50): Observable<IDirectMessage[]> {
    return this.http.get<IDirectMessage[]>(`${this.dmUrl}/${otherUserId}`, {
      params: { limit: limit.toString() },
    });
  }

  /**
   * Update an existing direct message (only sender can do this)
   */
  updateDirectMessage(messageId: string, messageText: string): Observable<IDirectMessage> {
    return this.http.patch<IDirectMessage>(
      `${this.dmUrl}/${messageId}`,
      { messageText } as IUpdateDirectMessage,
    );
  }

  /**
   * Delete (soft-delete) a direct message (only sender can do this)
   */
  deleteDirectMessage(messageId: string): Observable<void> {
    return this.http.delete<void>(`${this.dmUrl}/${messageId}`);
  }

  /**
   * Get the last message in a conversation with a specific user
   */
  getLastMessage(otherUserId: string): Observable<IDirectMessage[]> {
    return this.http.get<IDirectMessage[]>(`${this.dmUrl}/${otherUserId}`, {
      params: { limit: '1' },
    });
  }
}
