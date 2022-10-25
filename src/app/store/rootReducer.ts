import { combineReducers } from "@reduxjs/toolkit";
import { userApi } from "./user/userApi";
import app from "./app";

const rootReducer = combineReducers({
  app,
  [userApi.reducerPath]: userApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
