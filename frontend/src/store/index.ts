import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./slices/article";
import politicianReducer from "./slices/politician";

export const store = configureStore({
  reducer: {
    article: articleReducer,
    politician: politicianReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
<<<<<<< HEAD
export default store;
=======
export default store;
>>>>>>> f7f29bfb2c8c350b8d634f9604627bff28c1aefb
