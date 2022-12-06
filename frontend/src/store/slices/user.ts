import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface UserType {
  email: string;
  pw: string;
}

const initialState: UserType = {
  email: "",
  pw: ""
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    postEmailPw: (state, action: PayloadAction<{ email: string; pw: string }>) => {
      state.email = action.payload.email;
      state.pw = action.payload.pw;
    }
  }
});


export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;