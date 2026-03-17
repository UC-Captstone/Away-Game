/**
 * Friend request statuses
 */
export type FriendRequestStatus = 'pending' | 'accepted' | 'rejected';

/**
 * Outgoing friend request
 */
export interface IFriendRequest {
  requestId: string;
  senderId: string;
  receiverId: string;
  status: FriendRequestStatus;
  createdAt: string;
  updatedAt?: string | null;
  senderUsername?: string;
  senderAvatarUrl?: string | null;
  receiverUsername?: string;
  receiverAvatarUrl?: string | null;
}

/**
 * A confirmed friendship
 */
export interface IFriendship {
  friendshipId: string;
  friendUserId: string;
  friendUsername: string;
  friendAvatarUrl?: string | null;
  createdAt: string;
}

/**
 * Request bodies
 */
export interface ISendFriendRequest {
  receiverId: string;
}

export interface IUpdateFriendRequest {
  status: Extract<FriendRequestStatus, 'accepted' | 'rejected'>;
}

/**
 * User search result (for finding users to friend)
 */
export interface IUserSearchResult {
  userId: string;
  username: string;
  avatarUrl?: string | null;
}
