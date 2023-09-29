export default async function askAI(context, input) {
  try {
    const response = await fetch('/.netlify/functions/ask-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        payload: {
          context,
          input,
        },
        temperature: 1.0,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Fetch error:', error);
    return { error: error.message };
  }
}

// async function sendRequest({ token, model, context, input, temperature }) {
//   const messages = [
//     {
//       role: 'system',
//       content: String(context),
//     },
//     {
//       role: 'user',
//       content: String(input),
//     },
//   ];

//   let headers = {};
//   if (token === null) {
//     headers = {
//       'Content-Type': 'application/json',
//     };
//   } else {
//     headers = {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     };
//   }
//   try {
//     const response = await fetch('https://api.openai.com/v1/chat/completions', {
//       headers,
//       method: 'POST',
//       body: JSON.stringify({ messages, model, temperature }),
//     });

//     if (!response.ok) {
//       throw new Error(
//         `Failed with status: ${response.status} (${response.statusText})`,
//       );
//     }

//     const data = await response.json();
//     return data.choices[0].message.content;
//   } catch (error) {
//     return { error: error.message };
//   }
// }

// export default function askAI({ context, input }) {
//   const token = mode.isDevelopment
//     ? import.meta.env.VITE_OPEN_AI_API_KEY_PIZZA_AI
//     : import.meta.env.VITE_OPEN_AI_API_KEY_PIZZA_AI;
//   return sendRequest({
//     token,
//     model: 'gpt-3.5-turbo',
//     context,
//     input,
//     temperature: 1.0,
//   });
// }
