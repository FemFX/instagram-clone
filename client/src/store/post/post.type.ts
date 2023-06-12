import { IImage } from "@/types/image.type";
import { IComment } from "../comment/comment.type";
import { IUser } from "../user/user.type";
import { ILike } from "../like/like.type";

export interface IPost {
  id: number;
  likes: ILike[];
  user: IUser;
  images: IImage[];
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}
export interface IGetPosts {
  posts: IPost[];
  hasMore: boolean;
}
// export interface ICreatePost {
//   post: IPost;
// }
