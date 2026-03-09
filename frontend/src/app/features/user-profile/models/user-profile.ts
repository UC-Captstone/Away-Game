import { IChatMessage } from '../../../shared/models/chat-message';
import { IEvent } from '../../../shared/models/event';
import { IAccountSettings } from './account-settings';
import { IHeaderInfo } from './header';

export interface IUserProfile {
  headerInfo: IHeaderInfo;
  accountSettings: IAccountSettings;
  savedEvents: IEvent[];
  myEvents: IEvent[];
  myChats: IChatMessage[];
}
