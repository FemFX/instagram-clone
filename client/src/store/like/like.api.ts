import { postApi } from "../post/post.api";
import { ILike } from "./like.type";

export const likeApi = postApi.injectEndpoints({
  endpoints: (build) => ({
    like: build.mutation<boolean | ILike, number>({
      query: (postId) => ({
        url: "like",
        method: "POST",
        body: {
          postId,
        },
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});
export const { useLikeMutation } = likeApi;
