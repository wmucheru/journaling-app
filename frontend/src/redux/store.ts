/**
 *
 * https://redux-toolkit.js.org/usage/usage-with-typescript
 *
 */
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import journalReducer from "@/redux/slices/journal";
import categoryReducer from "@/redux/slices/category";

export const store = configureStore({
  reducer: {
    journal: journalReducer,
    categories: categoryReducer,
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
