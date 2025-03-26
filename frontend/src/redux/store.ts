/**
 *
 * https://redux-toolkit.js.org/usage/usage-with-typescript
 *
 */
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import categoryReducer from "@/redux/slices/category";
import journalReducer from "@/redux/slices/journal";
import userReducer from "@/redux/slices/user";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    journal: journalReducer,
    users: userReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;
