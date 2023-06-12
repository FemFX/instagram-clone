import { ISubscription } from "@/types/subscription.type";
import { IPost } from "../post/post.type";
import { IComment } from "../comment/comment.type";
import { ILike } from "../like/like.type";

export interface IUser {
  id: number;
  fullName: string;
  username: string;
  password: string;
  email: string;
  description?: string;
  avatarPath?: string;
  isActivated: boolean;
  activationLink?: string;
  createdAt: string;
  updatedAt: string;
  subscriptions: ISubscription[];
  subscribers: ISubscription[];
  posts: IPost[];
  comments: IComment[];
  likes: ILike[];
}

export interface IUserState {
  user: IUser;
  loading: boolean;
  error: any;
}
export interface ILoginData {
  user: IUser;
  accessToken: string;
}
export interface ILoginInput {
  usernameOrEmail: string;
  password: string;
}
