export default async function generateEmbeddings({ token, model, input }) {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: JSON.stringify({ input, model }),
  });

  const { data } = await response.json();

  return data[0].embedding;
}

/*
--- How to get embeddings ---
  const handleGetEmbeddings = () => {
    const vector = generateEmbeddings({
      token: import.meta.env.VITE_OPEN_AI_API_KEY_PIZZA_AI,
      model: 'text-embedding-ada-002',
      input: 'A delicious vegetarian pizza with three toppings.',
    });
    vector.then((res) => console.log(res));
  };
*/
