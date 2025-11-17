export interface IUser {
  user_id: string;
  username: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  profile_picture_url?: string | null;
  is_verified: boolean;
  pending_verification: boolean;
  created_at: string;
  updated_at?: string | null;
}