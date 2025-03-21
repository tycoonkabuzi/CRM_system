import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    clickedPage: "customers",
    idCustomer: "67d2a978e569855b16c8ee30",
  },
  reducers: {
    getClickedPage(state, action) {
      state.clickedPage = action.payload;
      return state;
    },
    getIdCustomer(state, action) {
      state.idCustomer = action.payload;
      return state;
    },
  },
});
export const { getClickedPage, getIdCustomer } = paginationSlice.actions;
export default paginationSlice.reducer;
