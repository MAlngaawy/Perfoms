import { combineReducers } from "@reduxjs/toolkit";
import dialog from "./dialogSlice";
import settings from "./settingsSlice";

const appReducers = combineReducers({
  settings,
  dialog,
});

export default appReducers;
