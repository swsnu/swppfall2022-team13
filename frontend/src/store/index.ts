import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./slices/article";
import politicianReducer from "./slices/politician";
import petitionReducer from "./slices/petition";
import quoraReducer from "./slices/quora";
import userReducer from "./slices/user";
import commentReducer from "./slices/comment";

export const store = configureStore({
  reducer: {
    article: articleReducer,
    politician: politicianReducer,
    petition: petitionReducer,
    quora: quoraReducer,
    user: userReducer,
    comment: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
