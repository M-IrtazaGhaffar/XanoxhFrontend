import { configureStore } from "@reduxjs/toolkit";
import { checkTokenReducer } from "../reducers/reducer";

const store = configureStore({
  reducer: {
    checkToken: checkTokenReducer,
  },
});

export default store;
