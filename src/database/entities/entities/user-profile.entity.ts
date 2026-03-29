export interface UserProfile {
  user_id: string;
  full_name?: string;
  username?: string;
  avatar_url?: string;
  phone_number?: string;
  dob?: Date;
  is_profile_updated?: boolean;
}
