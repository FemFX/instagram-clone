import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/user.slice";
import { useDispatch } from "react-redux";
import { postApi } from "./post/post.api";
import { commentApi } from "./comment/comment.api";
import { userApi } from "./user/user.api";
import { likeApi } from "./like/like.api";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  [likeApi.reducerPath]: likeApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postApi.middleware,
      commentApi.middleware,
      userApi.middleware,
      likeApi.middleware
    ),
});
export type TypeRootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
