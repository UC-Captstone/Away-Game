/**
 * Event Chat Models
 * Interfaces for event chat messages and related data structures
 */

/**
 * Represents a single chat message in an event
 */
export interface IEventChatMessage {
  messageId: string;
  eventId: string;
  userId: string;
  messageText: string;
  timestamp: string; // ISO 8601 date string
  userName?: string | null; // Populated from user relationship
  userAvatarUrl?: string | null; // Populated from user relationship
}

/**
 * Data required to create a new event chat message
 */
export interface IEventChatCreate {
  eventId: string;
  userId: string;
  messageText: string;
}

/**
 * Response from paginated chat endpoint
 */
export interface IEventChatPaginatedResponse {
  messages: IEventChatMessage[];
  hasMore: boolean;
  oldestTimestamp: string | null;
}

/**
 * Response from typing indicator endpoints
 */
export interface ITypingStatusResponse {
  typingUsers: string[]; // Array of user IDs
}
