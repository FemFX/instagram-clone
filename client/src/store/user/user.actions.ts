import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginData, ILoginInput } from "./user.type";
import $api from "@/utils/http";

export const me = createAsyncThunk("user/me", async (_, thunkAPI) => {
  try {
    const { data } = await $api.post("/user");
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});
export const login = createAsyncThunk<ILoginData, ILoginInput>(
  "user/login",
  async (input, thunkAPI) => {
    try {
      const { data } = await $api.post("/user/login", input);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
