import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./authenticationSlice";
import changeFormReducer from "./newEditSlice";
export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    changeForm: changeFormReducer,
  },
});
