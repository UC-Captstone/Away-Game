export interface IChatMessage {
  chatID: string; // UUID
  teamID: string; // UUID of the team associated with the chat
  teamLogoUrl?: string; // optional URL to the team's logo
  userID: string; // UUID of the user who sent the message
  userName: string; // Name of the user who sent the message
  userAvatarUrl?: string; // optional URL to the user's avatar
  messageContent: string; // Content of the chat message
  timestamp: Date; // Date and time when the message was sent
}
