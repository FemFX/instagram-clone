import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IComment, ICreateComment } from "./comment.type";
import { postApi } from "../post/post.api";

export const commentApi = postApi.injectEndpoints({
  //   baseQuery: fetchBaseQuery({
  //     baseUrl: `${process.env.API_URL}/comment`,
  //     credentials: "include",
  //     prepareHeaders: (headers) => {
  //       headers.set("Authorization", `bearer ${localStorage.getItem("token")}`);
  //       return headers;
  //     },
  //   }),
  endpoints: (build) => ({
    addComment: build.mutation<IComment, ICreateComment>({
      query: (createCommentData) => ({
        url: "comment/create",
        method: "POST",
        body: createCommentData,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
  overrideExisting: false,
});
export const { useAddCommentMutation } = commentApi;
 