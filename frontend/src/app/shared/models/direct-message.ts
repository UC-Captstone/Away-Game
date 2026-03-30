/**
 * Direct message between two users
 */
export interface IDirectMessage {
  messageId: string;
  senderId: string;
  receiverId: string;
  messageText: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt?: string | null;
  senderUsername?: string;
  senderAvatarUrl?: string | null;
}

/**
 * Request body for sending a DM
 */
export interface ISendDirectMessage {
  receiverId: string;
  messageText: string;
}

/**
 * Request body for updating a DM
 */
export interface IUpdateDirectMessage {
  messageText: string;
}

/**
 * Conversation summary for inbox
 */
export interface IConversationPreview {
  otherUserId: string;
  otherUsername: string;
  otherAvatarUrl?: string | null;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
}
