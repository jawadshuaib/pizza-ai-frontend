import { createSlice } from '@reduxjs/toolkit';
import getAvailableToppings from '../services/query-supabase';
import { toLowerCaseArray } from '../utils/common';
// import askAI from '../services/ask-ai';

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
      state.available = toLowerCaseArray(
        action.payload.map((row) => row.topping),
      );
    },
    setSuggestedToppings(state, action) {
      // Store an array of toppings in state
      state.suggested = toLowerCaseArray(action.payload);
    },
    updateSelectedToppings(state, action) {
      state.selected = toLowerCaseArray(action.payload);
      // loop thourgh the selected toppings
      // remove the topping if checked is false
      // add the topping if checked is true
      // if (!checked) {
      //   state.selected = state.selected.filter((t) => t !== topping);
      // } else {
      //   state.selected.push(topping);
      // }
    },
  },
});

export default toppingsReducer.reducer;

export const { updateSelectedToppings, setShowAllToppings } =
  toppingsReducer.actions;

export function setAvailableToppings() {
  return async function (dispatch) {
    // Get toppings from DB in Supabase
    const available = await getAvailableToppings();
    dispatch(toppingsReducer.actions.setAvailableToppings(available));
  };
}

export function setSuggestedToppings(availableToppings, input) {
  // Get suggested toppings from openai
  return async function (dispatch) {
    // Create a prompt
    //     let context = `You are a pizza chef. A customer needs your help to make a delicious pizza.
    //     Use your expertise to help pick most popular toppings for the pizza. You can ONLY
    //     pick toppings from the following list delimitted by ***:
    // ***
    // ---CUSTOM---STRING---HERE---
    // ***
    //     Pick less than five toppings unless the customer tells you otherwise. Return the answer in JSON only.`;

    // Create a string of toppings delimitted by line breaks
    // const toppingsStr = availableToppings.join('\n');
    // Add toppings to the prompt
    // context = context.replace('---CUSTOM---STRING---HERE---', toppingsStr);
    availableToppings;
    input;
    // const resp = await askAI({
    //   context,
    //   input,
    // });
    const suggestions = toLowerCaseArray(['Onions', 'Bacon']);
    // const suggestions = JSON.parse(resp).toppings;
    dispatch(toppingsReducer.actions.setSuggestedToppings(suggestions));
  };
}
