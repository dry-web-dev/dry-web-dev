import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { auth } from "./states/auth";
import React, { useEffect } from "react";

const rootReducer = combineReducers({
  auth: auth.reducer,
});

const store = configureStore({
  reducer: rootReducer
});

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {}, []);
  return <Provider store={store}>{children}</Provider>;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;