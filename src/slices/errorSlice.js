// Use this slice to decide whether to show Error Flag or not
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isError: false,
  reason: null,
};
const errorReducer = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action) {
      const [isError, reason] = action.payload;
      if (isError) {
        state.reason = reason;
      } else {
        state.reason = null;
      }
      state.isError = isError;
    },
  },
});
export default errorReducer.reducer;
export const { setError } = errorReducer.actions;
