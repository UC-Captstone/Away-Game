import { IPost } from '../../community/models/post';
import { IEvent } from '../../events/models/event';
import { IAccountSettings } from './account-settings';
import { IHeaderInfo } from './header';

export interface IUserProfile {
  headerInfo: IHeaderInfo;
  savedEvents: IEvent[];
  myPosts: IPost[];
  accountSettings: IAccountSettings;
}
