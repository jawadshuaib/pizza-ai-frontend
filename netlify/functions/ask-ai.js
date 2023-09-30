/* eslint-env node */
import axios from 'axios';

export async function handler(event) {
  if (event.httpMethod !== 'POST')
    return { statusCode: 405, body: 'Method Not Allowed' };

  const token = process.env.OPENAI_API_KEY;
  const { model, payload, temperature } = JSON.parse(event.body);

  const { context, input } = payload;

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

  let headers = {};

  headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      { messages, model, temperature },
      { headers },
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        content: response.data.choices[0].message.content,
      }),
    };
  } catch (error) {
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
