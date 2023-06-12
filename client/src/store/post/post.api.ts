import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGetPosts, IPost } from "./post.type";

export const postApi = createApi({
  reducerPath: "api/posts",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL}/`,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    getPosts: build.query<IGetPosts, string>({
      query: (p) => `post?p=${p}`,
      providesTags: ["Post"],
    }),
    createPost: build.mutation({
      query: (body) => ({
        url: "post/create",
        method: "POST",
        body,
        // headers: {
        //   "Content-Type": `multipart/form-data`,
        // },
      }),
      invalidatesTags: ["Post"],
    }),
    getPostById: build.query<IPost, string>({
      query: (postId) => `post/${postId}`,
    }),
    deletePost: build.mutation<boolean, string>({
      query: (postId) => ({
        url: `post/delete/${postId}`,
        method: "POST",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});
export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useGetPostByIdQuery,
  useDeletePostMutation,
} = postApi;
