import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  description: '',
};

const pizzaReducer = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    saveDescription(state, action) {
      state.description = action.payload;
    },
  },
});

export default pizzaReducer.reducer;

export const { saveDescription } = pizzaReducer.actions;
