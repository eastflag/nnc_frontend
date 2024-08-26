import {combineReducers, configureStore} from '@reduxjs/toolkit';
import counterSlice from './counter';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import {PERSIST} from "redux-persist/es/constants";

const reducers = combineReducers({
  count: counterSlice.reducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['count']
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
