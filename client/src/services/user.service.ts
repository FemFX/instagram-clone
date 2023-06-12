import { IUser } from "@/store/user/user.type";
import $api from "@/utils/http";
import axios from "axios";

export const getAll = async () => {
  const { data } = await $api.get<IUser[]>("/user/all");
  return data;
};
export const getUserByUsername = async (username: string) => {
  if (username) {
    const { data } = await axios.get<IUser[]>(
      `${process.env.API_URL}/user/username/${username}`
    );

    return data;
  }
};
export const searchUser = async (searchTerm: string) => {
  const { data } = await $api.post<IUser>(
    `${process.env.API_URL}/user/search`,
    {
      searchTerm,
    }
  );
  return data;
};
