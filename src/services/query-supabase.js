import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY,
);

export default async function getAvailableToppings() {
  const { data } = await supabase.from('toppings').select();
  return data;
}

export async function getSimilarToppings(embedding) {
  const { data } = await supabase.rpc('match_toppings', {
    query_embedding: embedding,
    match_threshold: 0.78,
    match_count: 5,
  });
  return data;
}

/*
--- How to query Supabase ---
  const handleGetAllToppings = () => {
    const toppings = getAllToppings();
    toppings.then((rows) => rows.forEach((row) => console.log(row.topping)));
  };

  const handleGetSimilarToppings = () => {
    const vector = generateEmbeddings({
      token: import.meta.env.VITE_OPEN_AI_API_KEY_PIZZA_AI,
      model: 'text-embedding-ada-002',
      input: 'A delicious vegetarian cheese pizza without pepperoni',
    });

    vector.then((embedding) => {
      const toppings = getSimilarToppings(embedding);
      // console.log(toppings);
      toppings.then((rows) => rows.forEach((row) => console.log(row.topping)));
    });
  };
*/
