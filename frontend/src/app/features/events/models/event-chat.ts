/** A single chat message returned from GET /api/event-chats/... */
export interface IEventChatMessage {
  /** UUID of the message */
  messageId: string;
  /** UUID of the event this message belongs to */
  eventId: string;
  /** UUID of the author */
  userId: string;
  messageText: string;
  /** ISO-8601 UTC timestamp set by the server */
  timestamp: string;
  /** Display name resolved from the user relationship */
  userName: string | null;
  /** Avatar URL resolved from the user relationship */
  userAvatarUrl: string | null;
}

/**
 * Response envelope returned by GET /api/event-chats/event/{eventId}
 *
 * Polling contract
 * ----------------
 * - On **initial load** omit `since`; store `nextCursor` from the response.
 * - On each **poll** pass `since=<nextCursor>`; when `messages` is empty
 *   you are up-to-date — keep the same cursor for the next call.
 *   When messages arrive, append them and update the cursor.
 */
export interface IEventChatPage {
  messages: IEventChatMessage[];
  /**
   * ISO-8601 timestamp of the most-recent message in this response.
   * Pass this as `?since=` on the next poll.  Null when there are no messages.
   */
  nextCursor: string | null;
}

/** Request body for POST /api/event-chats/ */
export interface IEventChatSend {
  /** UUID of the event to post to */
  eventId: string;
  /** Message body — max 1 000 characters */
  messageText: string;
}
