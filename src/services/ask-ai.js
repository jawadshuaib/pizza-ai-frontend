async function sendRequest({ token, model, context, input, temperature }) {
  const messages = [
    {
      role: 'system',
      content: String(context),
    },
    {
      role: 'user',
      content: String(input),
    },
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: JSON.stringify({ messages, model, temperature }),
  });

  const data = await response.json();

  return data.choices[0].message.content;
}

export default function askAI({ context, input }) {
  return sendRequest({
    token: import.meta.env.VITE_OPEN_AI_API_KEY_PIZZA_AI,
    model: 'gpt-3.5-turbo',
    context,
    input,
    temperature: 1.0,
  });
}
