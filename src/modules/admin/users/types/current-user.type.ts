export interface CurrentUserPayload {
  sub: string;
  email: string;
  user: {
    id: string;
    email: string;
    username: string;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
    phone_number: string | null;
    is_locked: boolean;
    locked_at: string | null;
  };
  roles: string[];
}
