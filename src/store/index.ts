import {combineReducers, configureStore} from '@reduxjs/toolkit';
import counterSlice from './counterSlice.ts';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import {PERSIST} from "redux-persist/es/constants";
import authSlice from "./authSlice.ts";
import toastSlice from "./toastSlice.ts";
import adminSlice from "./adminSlice.ts";

const reducers = combineReducers({
  count: counterSlice.reducer,
  auth: authSlice.reducer,
  toast: toastSlice.reducer,
  admin: adminSlice.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),
});

export default store;
