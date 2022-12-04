import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./slices/article";
import politicianReducer from "./slices/politician";
import userReducer from "./slices/user";

export const store = configureStore({
  reducer: {
    article: articleReducer,
    politician: politicianReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
