import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  userToken: string | null;
}

const userToken = localStorage.getItem("token") 

const initialState: InitialState = {
  userToken
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      localStorage.setItem("token", action.payload);
      state.userToken = action.payload;
    },
    logout(state) {
      localStorage.removeItem("token")
      state.userToken = null;
    },
  },
});

export default authSlice.reducer;

export const { login, logout } = authSlice.actions;
