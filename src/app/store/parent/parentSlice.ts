import { createSlice } from "@reduxjs/toolkit";
import { Player } from "../types/parent-types";

const initialState = {
  selectedPlayer: null,
};

const parentSlice = createSlice({
  name: "parentSlice",
  initialState,
  reducers: {
    selectPlayer(state, { payload }) {
      state.selectedPlayer = payload;
    },
  },
});

export const { selectPlayer } = parentSlice.actions;
export const selectedPlayerFn = (state: any): Player =>
  state.parent.selectedPlayer;
export default parentSlice.reducer;
