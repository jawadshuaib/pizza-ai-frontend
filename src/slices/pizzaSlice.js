import { createSlice } from '@reduxjs/toolkit';
import { setLoading } from './loadingSlice';
import askAI from '../services/ask-ai';
import generateImage, { createImagePrompt } from '../services/generate-image';

const initialState = {
  description: '',
  AIName: '',
  AIDescription: '',
  AIImage: '',
};

const pizzaReducer = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    saveDescription(state, action) {
      state.description = action.payload;
    },
    setAIName(state, action) {
      state.AIName = action.payload;
    },
    setAIDescription(state, action) {
      state.AIDescription = action.payload;
    },
    setAIImage(state, action) {
      state.AIImage = action.payload;
    },
  },
});

export default pizzaReducer.reducer;

export const { saveDescription } = pizzaReducer.actions;

export function setAIImage(toppings) {
  return async function (dispatch) {
    dispatch(setLoading([true, 'Creating preview...']));
    const imagePrompt = createImagePrompt(toppings);
    const imageUrl = await generateImage(imagePrompt);
    dispatch(pizzaReducer.actions.setAIImage(imageUrl));
    dispatch(setLoading([false, '']));
  };
}

export function setAISuggestions(toppings) {
  // Get suggested toppings from openai
  return async function (dispatch) {
    dispatch(setLoading([true, 'Creating your perfect pizza...']));
    // Create a prompt
    let context = `A customer has created a pizza with toppings delimited by ***.
        You are a pizza expert. Come up with a name that best suits this pizza. And also come up with a delicious description for this pizza.:
    ***
    ---CUSTOM---STRING---HERE---
    ***
      Description should be 1-2 sentences long.`;

    // Create a string of toppings delimitted by line breaks
    const toppingsStr = toppings.join('\n');
    // Add toppings to the prompt
    context = context.replace('---CUSTOM---STRING---HERE---', toppingsStr);

    const input = `Find a name and description for this pizza. 
      Answer should be formatted in a JSON object 
      with the fields 'name' and 'description'. 
      Return the answer in JSON only.`;

    const resp = await askAI({
      context,
      input,
    });

    const pizzaAI = JSON.parse(resp);

    dispatch(pizzaReducer.actions.setAIName(pizzaAI.name));
    dispatch(pizzaReducer.actions.setAIDescription(pizzaAI.description));
    dispatch(setLoading([false, '']));
  };
}
