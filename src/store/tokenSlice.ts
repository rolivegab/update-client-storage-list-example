import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: string | undefined;
}

const initialState: CounterState = {
  value: undefined,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    authenticate(state) {
      state.value = "123token";
    },
    logout(state) {
      state.value = undefined;
    },
  },
});

export const { authenticate, logout } = tokenSlice.actions;

export default tokenSlice.reducer;
