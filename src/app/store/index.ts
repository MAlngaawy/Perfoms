import { parentsApi } from "./parent/parentApi";
import { coreApi } from "./core/coreApi";
import { eventsApi } from "./events/eventsApi";
import { attendanceApi } from "./attendance/attendanceApi";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import rootReducer from "./rootReducer";
import { userApi } from "./user/userApi";
import { coachApi } from "./coach/coachApi";
import { createLogger } from "redux-logger";
import { supervisorApi } from "./supervisor/supervisorMainApi";

export interface SerializedError {
  name?: string;
  data: {
    message?: string;
  };
  status: number;
}

if (process.env.NODE_ENV === "development" && import.meta.hot) {
  import.meta.hot.accept("./rootReducer", () => {
    const newRootReducer = require("./rootReducer").default;
    store.replaceReducer(newRootReducer.createReducer());
  });
}

const middlewares: any[] = [
  userApi.middleware,
  attendanceApi.middleware,
  coachApi.middleware,
  eventsApi.middleware,
  coreApi.middleware,
  parentsApi.middleware,
  supervisorApi.middleware,
];

if (process.env.NODE_ENV === "development") {
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
