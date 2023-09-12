import askAI from './ask-ai';
import getAllToppings from './query-supabase';

// Create a prompt
let context = `You are a pizza chef. A customer needs your help to make a delicious pizza. 
Use your expertise to help pick most popular toppings for the pizza. You can ONLY 
pick toppings from the following list delimitted by ***:
*** 
---CUSTOM---STRING---HERE---
***
Pick less than five toppings unless the customer tells you otherwise. Return the answer in JSON only.`;

function askAIToSuggestToppings(input) {
  // Get toppings from DB in Supabase
  const toppings = getAllToppings();

  toppings.then((rows) => {
    // Create a string of toppings delimitted by line breaks
    const toppingsStr = rows.map((row) => row.topping).join('\n');
    // Add toppings to the prompt
    context = context.replace('---CUSTOM---STRING---HERE---', toppingsStr);

    const vector = askAI({
      context,
      input,
    });

    vector.then((resp) => {
      console.log(JSON.parse(resp).toppings);
    });
  });
}

export default askAIToSuggestToppings;
