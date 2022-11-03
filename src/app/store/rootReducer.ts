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
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
