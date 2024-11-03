import { configureStore } from "@reduxjs/toolkit";
import { studentApi } from "./features/StudentSlice";

//middleware is going to help chacheing the server data
export const store = configureStore({
  reducer: {
    [studentApi.reducerPath]: studentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
