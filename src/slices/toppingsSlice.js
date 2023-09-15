import { createSlice } from '@reduxjs/toolkit';
import { setLoading } from './loadingSlice';
import { toLowerCaseArray } from '../utils/common';
import askAI from '../services/ask-ai';

const initialState = {
  available: [],
  suggested: [],
  selected: [],
};

// We create all of our reducers in one file, and export them all.
// We can also add middleware (thunks) here, which is built into Redux Toolkit.
const toppingsReducer = createSlice({
  name: 'toppings',
  initialState,
  reducers: {
    setAvailableToppings(state, action) {
      // Store an array of toppings in state
      state.available = action.payload;
    },
    setSuggestedToppings(state, action) {
      // Store an array of toppings in state
      state.suggested = toLowerCaseArray(action.payload);
    },
    updateSelectedToppings(state, action) {
      state.selected = toLowerCaseArray(action.payload);
    },
  },
});

export default toppingsReducer.reducer;

export const {
  updateSelectedToppings,
  setShowAllToppings,
  setAvailableToppings,
} = toppingsReducer.actions;

export function setSuggestedToppings(availableToppings, input) {
  // Get suggested toppings from openai
  return async function (dispatch) {
    dispatch(setLoading([true, 'Getting suggested toppings...']));
    // Create a prompt
    let context = `You are a pizza chef. A customer needs your help to make a delicious pizza.
        Use your expertise to help pick most popular toppings for the pizza. You can ONLY
        pick toppings from the following list delimited by ***:
    ***
    ---CUSTOM---STRING---HERE---
    ***
        Pick less than five toppings unless the customer tells you otherwise. Return the answer in JSON only.`;

    // Create a string of toppings delimitted by line breaks
    const toppingsStr = availableToppings.join('\n');
    // Add toppings to the prompt
    context = context.replace('---CUSTOM---STRING---HERE---', toppingsStr);
    // availableToppings;
    // input;
    const resp = await askAI({
      context,
      input,
    });
    // const suggestions = toLowerCaseArray(['Onions', 'Bacon']);
    const suggestions = JSON.parse(resp).toppings;
    dispatch(toppingsReducer.actions.setSuggestedToppings(suggestions));
    dispatch(setLoading([false, '']));
  };
}
