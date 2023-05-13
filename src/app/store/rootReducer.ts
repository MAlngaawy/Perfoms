import { parentsApi } from "./parent/parentApi";
import { coreApi } from "./core/coreApi";
import { eventsApi } from "./events/eventsApi";
import { combineReducers } from "@reduxjs/toolkit";
import { userApi } from "./user/userApi";
import app from "./app";
import { attendanceApi } from "./attendance/attendanceApi";
import { coachApi } from "./coach/coachApi";
import parent from "./parent/parentSlice";
import { supervisorApi } from "./supervisor/supervisorMainApi";
import { clubManagerApi } from "./clubManager/clubManagerApi";

import { healthApi } from "./health/healthApi";

import { chatAiApi } from "./chatAi/chatAiApi";

const rootReducer = combineReducers({
  app,
  parent,
  [userApi.reducerPath]: userApi.reducer,
  [attendanceApi.reducerPath]: attendanceApi.reducer,
  [coachApi.reducerPath]: coachApi.reducer,
  [eventsApi.reducerPath]: eventsApi.reducer,
  [coreApi.reducerPath]: coreApi.reducer,
  [parentsApi.reducerPath]: parentsApi.reducer,
  [supervisorApi.reducerPath]: supervisorApi.reducer,

  [healthApi.reducerPath]: healthApi.reducer,

  [clubManagerApi.reducerPath]: clubManagerApi.reducer,
  [chatAiApi.reducerPath]: chatAiApi.reducer,

});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
