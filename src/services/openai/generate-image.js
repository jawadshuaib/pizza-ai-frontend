/* eslint-disable no-unused-vars */
import OpenAI from 'openai';
import { mode } from '../../utils/settings';

async function sendRequest({ token, prompt, n, size }) {
  let openai;
  if (token === null) {
    // defaults token to process.env["OPENAI_API_KEY"]
    openai = new OpenAI({
      dangerouslyAllowBrowser: true,
    });
  } else {
    openai = new OpenAI({
      apiKey: token,
      dangerouslyAllowBrowser: true,
    });
  }

  const imageParams = {
    prompt,
    n: parseInt(n),
    size,
  };

  return 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-fjrJOPSACALV6hQYyDaufQ2g/user-LZMlgSZCBAhrIkOmf8ooTgu9/img-GedOTHYhFXmmkxk1ymL6Lmf6.png?st=2023-09-28T19%3A22%3A03Z&se=2023-09-28T21%3A22%3A03Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-09-28T03%3A28%3A49Z&ske=2023-09-29T03%3A28%3A49Z&sks=b&skv=2021-08-06&sig=pLzJoia/FMg8alHUKP265yyig36T2aCMUaNkW6GLdx4%3D';
  // const response = await openai.images.generate(imageParams);
  // const url = response.data[0].url;

  // return url;
}

export default function generateImage(prompt) {
  const token = mode.isDevelopment
    ? import.meta.env.VITE_OPEN_AI_API_KEY_PIZZA_AI
    : import.meta.env.VITE_OPEN_AI_API_KEY_PIZZA_AI;
  return sendRequest({
    token,
    prompt,
    n: 1,
    size: '512x512',
  });
}

export function createImagePrompt(toppings) {
  const description = toppings.length > 0 ? toppings.join(', ') : '';
  return `A realistic photo of a delicious pizza with the following toppings: ${description}. The entire pizza should fit inside the photo.`;
}
