import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/store/auth/authSlice";

import { goalApi } from "@/features/store/goal/goalApi";
import { authApi } from "./auth/authApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [goalApi.reducerPath]: goalApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(goalApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;