import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { PoliticianType } from "./politician";

export interface UserType {
  email: string;
  pw: string;
  isPolitician?: boolean;
}

const initialState: UserType = {
  email: "",
  pw: "",
  isPolitician: false,
};

export const isPolitician = createAsyncThunk(
  "politician/isPolician",
  async (td: Pick<PoliticianType, "name" | "email">, { dispatch }) => {
    const response = await axios.post(
      "http://ec2-13-209-0-212.ap-northeast-2.compute.amazonaws.com:8000/api/politician/isPolitician/",
      td
    );
    return userActions.postIsPolitician(response.data);
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    postEmailPw: (
      state,
      action: PayloadAction<{ email: string; pw: string }>
    ) => {
      state.email = action.payload.email;
      state.pw = action.payload.pw;
    },
    postIsPolitician: (
      state,
      action: PayloadAction<{ isPolitician: boolean }>
    ) => {
      state.isPolitician = action.payload.isPolitician;
    },
  },
});

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
