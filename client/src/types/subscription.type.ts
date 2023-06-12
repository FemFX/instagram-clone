import { IUser } from "@/store/user/user.type";

export interface ISubscription {
  id: number;
  createdAt: string;
  updatedAt: string;
  fromUser: IUser;
  toChannel: IUser;
}
