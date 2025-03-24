/**
 *
 * https://redux-toolkit.js.org/usage/usage-with-typescript
 *
 */
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import journalReducer from "@/redux/slices/journal";

export const store = configureStore({
  reducer: {
    journal: journalReducer,
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
