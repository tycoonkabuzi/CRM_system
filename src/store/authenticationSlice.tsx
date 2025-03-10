import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type ApiData = { token: string; username: string };
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("authSlice") || null,
    username: null,
  }, // we create the initial state with the value of the localStorage if there is any
  reducers: {
    login: (state, action: PayloadAction<ApiData>) => {
      // we create a reducer, whenever we pass a token in it it update the initial state and put the new token and also store it in the localStorage
      state.token = action.payload.token;
      state.username = action.payload.username;
      localStorage.setItem("authToken", action.payload.token);
    },
    logout: (state) => {
      // once we logout, it take the state and put it back to null, and remove the key from the localstorage.
      state.token = null;
      localStorage.removeItem("authToken");
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
