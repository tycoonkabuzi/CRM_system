import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const changeSlice = createSlice({
  name: "changeForm",
  initialState: {
    changeState: false,
    data: {
      name: "",
      address: { street: "", suite: "", city: "", postcode: "" },
      nip: "",
      actions: ["64b3f1b5e8b0a1234567890c", "64b3f1b5e8b0a1234567890d"],
    },
  },
  reducers: {
    change: (state, action) => {
      state.changeState = action.payload;
      return state;
    },
    setTheData: (state, action) => {
      state.data = action.payload;
      return state;
    },
    cleanTheData: (state) => {
      state.data = {
        name: "",
        address: { street: "", suite: "", city: "", postcode: "" },
        nip: "",
        actions: ["64b3f1b5e8b0a1234567890c", "64b3f1b5e8b0a1234567890d"],
      };
      console.log(state);
    },
  },
});
export const { change, setTheData, cleanTheData } = changeSlice.actions;
export default changeSlice.reducer;
