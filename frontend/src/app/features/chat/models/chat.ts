/** A single chat message returned from GET /api/event-chats/... */
export interface IChatMessage {
  messageId: string;
  eventId: string;
  userId: string;
  messageText: string;
  timestamp: string;
  userName: string | null;
  userAvatarUrl: string | null;
}

/** Response envelope returned by GET /api/event-chats/event/{eventId} */
export interface IChatPage {
  messages: IChatMessage[];
  nextCursor: string | null;
}

/** Request body for POST /api/event-chats/ */
export interface IChatSend {
  eventId: string;
  gameId?: number;
  messageText: string;
}