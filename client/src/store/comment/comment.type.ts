export interface IComment {
  id: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  postId: number;
  userId: number;
  authorId: number;
}
export interface ICreateComment {
  postId: number;
  text: string;
}
