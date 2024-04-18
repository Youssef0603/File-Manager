import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loaded: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoaded: (state, action) => {
      state.loaded = action.payload;
    },
    
  },
});

export const {
  setLoaded, 
} = appSlice.actions;
export default appSlice.reducer;
