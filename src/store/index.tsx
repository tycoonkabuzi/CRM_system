import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./authenticationSlice";
import paginationReducer from "./paginationSlice";
import changeFormReducer from "./newEditSlice";
import newEditActionReducer from "./newEditActionsSlice";
export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    changeForm: changeFormReducer,
    paginationState: paginationReducer,
    newEditAction: newEditActionReducer,
  },
});
