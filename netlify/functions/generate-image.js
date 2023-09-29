/* eslint-env node */
import OpenAI from 'openai';

export async function handler(event) {
  if (event.httpMethod !== 'POST')
    return { statusCode: 405, body: 'Method Not Allowed' };

  try {
    const { prompt, n, size } = JSON.parse(event.body) || {};

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const imageParams = {
      prompt,
      n: parseInt(n) || 1,
      size: size || '512x512',
    };

    console.log(imageParams);

    const response = await openai.images.generate(imageParams);
    const url = response.data[0].url;

    return {
      statusCode: 200,
      body: JSON.stringify({ url }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
}
