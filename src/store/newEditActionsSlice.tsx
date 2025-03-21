import { createSlice } from "@reduxjs/toolkit";

const newEditActionSlice = createSlice({
  name: "newEditAction",
  initialState: {
    formChange: false,
    data: {
      type: "",
      description: "",
      date: "",
      customer: "",
    },
  },
  reducers: {
    changePage: (state, action) => {
      state.formChange = action.payload;
      return state;
    },
    getSingleAction: (state, action) => {
      state.data = action.payload;
      return state;
    },
    clearSingleAction: (state) => {
      state.data = {
        type: "",
        description: "",
        date: "",
        customer: "",
      };
      return state;
    },
  },
});
export const { changePage, getSingleAction, clearSingleAction } =
  newEditActionSlice.actions;
export default newEditActionSlice.reducer;
