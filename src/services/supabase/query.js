import supabase from './supabase';

export async function getAvailableToppings() {
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

// Check if order exists
export async function doesOrderExist({ orderId }) {
  try {
    const { count, error } = await supabase
      .from('orders')
      .select('order_id', { count: 'exact' })
      .eq('order_id', orderId);

    if (error) throw error;

    return { result: count > 0, error: null };
  } catch (error) {
    return { result: null, error }; // Return the error along with a null result
  }
}

export async function getOrderDetails({ orderId }) {
  const { data } = await supabase
    .from('orders')
    .select()
    .eq('order_id', orderId);
  return data;
}

export async function getCustomerDetails({ customerId }) {
  const { data } = await supabase
    .from('customers')
    .select()
    .eq('customer_id', customerId);
  return data;
}

export async function getToppingsOrdered({ orderId }) {
  const { data } = await supabase
    .from('order_toppings')
    .select('topping_id')
    .eq('order_id', orderId);
  return data;
}

export default getAvailableToppings;
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
