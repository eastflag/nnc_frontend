import { createSlice } from '@reduxjs/toolkit';

type AdminState = {
  collapsed: boolean;
}

const initialState: AdminState = {
  collapsed: false,
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    toggleCollapsed: (state: AdminState) => {
      state.collapsed = !state.collapsed;
    },
  }
});

export const adminActions = adminSlice.actions;
export default adminSlice;
