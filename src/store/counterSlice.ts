import { createSlice } from '@reduxjs/toolkit';

type CountState = {
  counter: number;
}
type CountAction = {
  payload: number;
  type: string;
}

const initialState: CountState = {
  counter: 0,
}

export const counterSlice = createSlice({
  name: 'countdown',
  initialState,
  reducers: {
    add: (state: CountState, action: CountAction) => {
      state.counter += action.payload;
    },
    sub: (state: CountState, action: CountAction) => {
      state.counter -= action.payload;
    },
  }
});

export const counterActions = counterSlice.actions;
export default counterSlice;
