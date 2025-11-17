import { IUser } from "../../../shared/models/user";

export interface UserAuthResponse {
  token: string;
  user: IUser
}
