import { createSlice } from '@reduxjs/toolkit';
import { toLowerCaseArray } from '../utils/common';
import askAI from '../services/openai/ask-ai';
import { setLoading } from './loadingSlice';
import { setError } from './errorSlice';

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
    reset(state) {
      state.selected = [];
      state.suggested = [];
    },
  },
});

export default toppingsReducer.reducer;

export const {
  updateSelectedToppings,
  setShowAllToppings,
  setAvailableToppings,
  reset,
} = toppingsReducer.actions;

export function setSuggestedToppings(allToppings = [], input) {
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
    // Note, this is different from availableToppings as it is an array of strings
    // and not an array of objects
    const toppingsStr = allToppings.join('\n');
    // Add toppings to the prompt
    context = context.replace('---CUSTOM---STRING---HERE---', toppingsStr);

    try {
      const resp = await askAI(context, input);
      // const suggestions = toLowerCaseArray(['Onions', 'Bacon']);
      const suggestions = JSON.parse(resp).toppings;
      dispatch(toppingsReducer.actions.setSuggestedToppings(suggestions));
      dispatch(setLoading([false, '']));
      dispatch(setError([false]));
    } catch (error) {
      dispatch(setLoading([false, '']));
      dispatch(
        setError([
          true,
          'There was an error getting suggested toppings from AI.',
        ]),
      );
    }
  };
}
