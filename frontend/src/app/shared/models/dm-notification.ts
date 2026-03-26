import { IConversationPreview } from './direct-message';

export interface IDMNotification extends IConversationPreview {
  lastMessageId: string;
}
