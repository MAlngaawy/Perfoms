import { attendanceApi } from "./attendance/attendanceApi";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import rootReducer from "./rootReducer";
import { userApi } from "./user/userApi";
import { coachApi } from "./coach/coachApi";

export interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
}

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./rootReducer", () => {
    const newRootReducer = require("./rootReducer").default;
    store.replaceReducer(newRootReducer.createReducer());
  });
}

const middlewares: any[] = [
  userApi.middleware,
  attendanceApi.middleware,
  coachApi.middleware,
];

if (process.env.NODE_ENV === "development") {
  const { createLogger } = require(`redux-logger`);
  const logger = createLogger({
    collapsed: (getState: any, action: any, logEntry: any) => !logEntry.error,
  });
  middlewares.push(logger);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
  devTools: process.env.NODE_ENV === "development",
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
