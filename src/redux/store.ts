import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import ticketsReducer from "./ticketsSlice";

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
