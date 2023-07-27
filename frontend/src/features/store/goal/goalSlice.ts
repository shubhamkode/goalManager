import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Goal } from "@/features/models/Goal";
import axiosClient from "@/features/config/axiosClient";

interface InitialState {
  goals: Goal[];
}

const initialState: InitialState = {
  goals: [],
};

const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => initialState,
    add: (state, action: PayloadAction<Goal>) => {
      return { goals: [...state.goals, action.payload] };
    },
    init: (state, action: PayloadAction<Goal[]>) => {
      return { goals: [...action.payload] };
    },
  },
});

export default goalSlice.reducer;
export const { reset, add, init } = goalSlice.actions;
