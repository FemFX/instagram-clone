import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "./user.type";

export const userApi = createApi({
  reducerPath: "api/user",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL}/`,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getUsers: build.query<IUser[], void>({
      query: () => `user/users`,
    }),
    getUserById: build.query<IUser, string>({
      query: (userId) => `user/${userId}`,
    }),
    getUserByUsername: build.query<IUser, string>({
      query: (username) => `user/username/${username}`,
    }),
  }),
});
export const { useGetUsersQuery,useGetUserByIdQuery, useGetUserByUsernameQuery } = userApi;
