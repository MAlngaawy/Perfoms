import { parentsApi } from "./parent/parentApi";
import { coreApi } from "./core/coreApi";
import { eventsApi } from "./events/eventsApi";
import { combineReducers } from "@reduxjs/toolkit";
import { userApi } from "./user/userApi";
import app from "./app";
import { attendanceApi } from "./attendance/attendanceApi";
import { coachApi } from "./coach/coachApi";

const rootReducer = combineReducers({
  app,
  [userApi.reducerPath]: userApi.reducer,
  [attendanceApi.reducerPath]: attendanceApi.reducer,
  [coachApi.reducerPath]: coachApi.reducer,
  [eventsApi.reducerPath]: eventsApi.reducer,
  [coreApi.reducerPath]: coreApi.reducer,
  [parentsApi.reducerPath]: parentsApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
