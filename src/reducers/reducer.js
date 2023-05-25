import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  marketerid: "",
};

export const checkTokenReducer = createReducer(initialState, {
  // When Signin
  addToken: (state, action) => {
    state.token = action.payload.token;
    state.marketerid = action.payload.marketerid;
  },
  //When Signout
  removeToken: (state, action) => {
    state.token = "";
    state.marketerid = "";
  },
});
