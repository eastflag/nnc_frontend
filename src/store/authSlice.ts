import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
  token: string;
}
type AuthAction = {
  payload: string;
  type: string;
}

const initialState: AuthState = {
  token: "",
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state: AuthState, action: AuthAction) => {
      state.token = action.payload;
    },
  }
});

export const authActions = authSlice.actions;
export default authSlice;