import OpenAI from 'openai';

async function sendRequest({ token, prompt, n, size }) {
  const openai = new OpenAI({
    apiKey: token, // defaults to process.env["OPENAI_API_KEY"]
    dangerouslyAllowBrowser: true,
  });

  const imageParams = {
    prompt,
    n: parseInt(n),
    size,
  };

  const response = await openai.images.generate(imageParams);
  const url = response.data[0].url;

  return url;
}

export default function generateImage(prompt) {
  return sendRequest({
    token: import.meta.env.VITE_OPEN_AI_API_KEY_PIZZA_AI,
    prompt,
    n: 1,
    size: '512x512', // 1024x1024
  });
}

export function createImagePrompt(toppings) {
  const description = toppings.join(', ');
  return `A realistic photo of a delicious pizza with the following toppings: ${description}. The entire pizza should fit inside the photo.`;
}
