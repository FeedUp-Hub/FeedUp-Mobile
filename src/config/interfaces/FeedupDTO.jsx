export interface FeedupDTO {
  id: string;
  id_usersend: string;
  id_userreceived: string;
  username_userreceived: string;
  value: string;
  message: string;
  isanonymous: boolean;
  isconstructive: boolean;
  likes: number;
  created_at: string;
  updated_at?: string;
}