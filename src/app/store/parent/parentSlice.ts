import { createSlice } from "@reduxjs/toolkit";
import { Player } from "../types/parent-types";

const initialState = {
  selectedPlayer: null,
  selectedTeam: null,
  timeFilter: null,
};

const parentSlice = createSlice({
  name: "parentSlice",
  initialState,
  reducers: {
    selectPlayer(state, { payload }) {
      localStorage.setItem("SelectedPlayer", JSON.stringify(payload));
      state.selectedPlayer = payload;
    },
    selectPlayerTeam(state, { payload }) {
      localStorage.setItem("SelectedPlayerTeam", JSON.stringify(payload));
      state.selectedTeam = payload;
    },
    timeFilter(state, { payload }) {
      localStorage.setItem("TimeFilter", JSON.stringify(payload));
      state.timeFilter = payload;
    },
  },
});

export const { selectPlayer, selectPlayerTeam, timeFilter } =
  parentSlice.actions;
export const selectedPlayerFn = (state: any): Player =>
  state.parent.selectedPlayer;
export const selectedPlayerTeamFn = (state: any): Player =>
  state.parent.selectedTeam;
export const timeFilterFn = (state: any): { month: string; year: string } =>
  state.parent.timeFilter;
export default parentSlice.reducer;
