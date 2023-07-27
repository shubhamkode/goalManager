import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  userToken: string | null;
}

const userToken = localStorage.getItem("token");

const initialState: InitialState = {
  userToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<string>) {
      state.userToken = action.payload;
      localStorage.setItem("token", action.payload);
    },
    removeCredentials(state) {
      state.userToken = null;
      localStorage.removeItem("token");
    },
  },
});

export default authSlice.reducer;

export const { setCredentials, removeCredentials } = authSlice.actions;
