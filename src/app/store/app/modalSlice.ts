import { createSlice } from "@reduxjs/toolkit";
const modalSlice = createSlice({
  name: "ModalSlice",
  initialState: {
    open: false,
    player: null,
  },
  reducers: {
    changemodalState(state, { payload }) {
      return (state = payload);
    },
  },
});

export const { changemodalState } = modalSlice.actions;
export const playerModalState = (state: any) => state.app.playerModal;

export default modalSlice.reducer;
