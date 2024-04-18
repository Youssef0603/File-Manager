import appReducer from './app/appSlice';
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});
