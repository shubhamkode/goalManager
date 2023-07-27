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
    login(state, action: PayloadAction<string>) {
      state.userToken = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout(state) {
      state.userToken = null;
      localStorage.removeItem("token");
    },
  },
});

export default authSlice.reducer;

export const { login, logout } = authSlice.actions;