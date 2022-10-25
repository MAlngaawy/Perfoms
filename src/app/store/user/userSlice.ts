import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: null,
  reducers: {},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
