export interface CommentsDTO {
  id: string;
  id_feedup: string;
  id_usercommented: string;
  message: string;
  like: number;
  created_at: string;
  updated_at?: string;
}