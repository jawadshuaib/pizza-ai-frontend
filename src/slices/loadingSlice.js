import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  reason: '',
};
const loadingReducer = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading(state, action) {
      const [loading, reason] = action.payload;
      if (loading) {
        state.reason = reason;
      } else {
        state.reason = '';
      }
      state.isLoading = loading;
    },
  },
});
export default loadingReducer.reducer;
export const { setLoading } = loadingReducer.actions;
