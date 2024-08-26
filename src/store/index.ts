import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';

const store = configureStore({
  reducer: {
    count: counterReducer,
  },
});

export default store;
