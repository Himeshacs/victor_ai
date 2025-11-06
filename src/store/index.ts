import { configureStore } from "@reduxjs/toolkit";
import { rootReducer, type RootState } from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type { RootState };
