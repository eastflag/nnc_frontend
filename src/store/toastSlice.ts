import { createSlice } from '@reduxjs/toolkit';

export type ToastState = {
  isOpened: boolean;
  severity: 'success' | 'info' | 'warning' | 'error' ;
  message: string;
}

type ToastAction = {
  payload: ToastState;
  type: string;
}

const initialState: ToastState = {
  isOpened: false,
  severity: 'success',
  message: ''
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    open: (state: ToastState, action: ToastAction) => {
      state.isOpened = action.payload.isOpened;
      state.severity = action.payload.severity;
      state.message = action.payload.message;
    },
    close: (state: ToastState) => {
      state.isOpened = false;
    },
  }
});

export const toastActions = toastSlice.actions;
export default toastSlice;
