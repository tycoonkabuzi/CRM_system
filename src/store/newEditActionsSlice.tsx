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
    setSingleAction: (state, action) => {
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
export const { changePage, setSingleAction, clearSingleAction } =
  newEditActionSlice.actions;
export default newEditActionSlice.reducer;
