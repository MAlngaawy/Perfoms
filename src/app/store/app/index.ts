import { combineReducers } from "@reduxjs/toolkit";
import dialog from "./dialogSlice";
import playerModal from "./modalSlice";
import settings from "./settingsSlice";

const appReducers = combineReducers({
  settings,
  dialog,
  playerModal,
});

export default appReducers;
