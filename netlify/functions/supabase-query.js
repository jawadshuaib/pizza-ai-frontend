/* eslint-env node */
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const { SUPABASE_URL, SUPABASE_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('SUPABASE_URL and SUPABASE_KEY must be provided');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function getAvailableToppings() {
  const { data, error } = await supabase.from('toppings').select();
  return { data, error };
}

async function getSimilarToppings(embedding) {
  const { data, error } = await supabase.rpc('match_toppings', {
    query_embedding: embedding,
    match_threshold: 0.78,
    match_count: 5,
  });
  return { data, error };
}

async function doesOrderExist({ orderId }) {
  try {
    const { count, error } = await supabase
      .from('orders')
      .select('order_id', { count: 'exact' })
      .eq('order_id', orderId);

    if (error) throw error;
    return { data: count > 0, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

async function getOrderDetails({ orderId }) {
  const { data, error } = await supabase
    .from('orders')
    .select()
    .eq('order_id', orderId);
  return { data, error };
}

async function getCustomerDetails({ customerId }) {
  const { data, error } = await supabase
    .from('customers')
    .select()
    .eq('customer_id', customerId);
  return { data, error };
}

async function getToppingsOrdered({ orderId }) {
  const { data, error } = await supabase
    .from('order_toppings')
    .select('topping_id')
    .eq('order_id', orderId);
  return { data, error };
}

export async function handler(event) {
  try {
    const pathArray = event.path.split('/');
    const action = pathArray[pathArray.length - 1]; // Getting the last element of the array

    let result;
    let body;
    switch (action) {
      case 'availableToppings':
        result = await getAvailableToppings();
        if (result.error) throw result.error;
        break;
      case 'similarToppings':
        body = JSON.parse(event.body); // Parse the request body to get the embedding data
        result = await getSimilarToppings(body.embedding);
        if (result.error) throw result.error;
        break;
      case 'doesOrderExist':
        result = await doesOrderExist(JSON.parse(event.body));
        break;
      case 'orderDetails':
        result = await getOrderDetails(JSON.parse(event.body));
        break;
      case 'customerDetails':
        result = await getCustomerDetails(JSON.parse(event.body));
        break;
      case 'toppingsOrdered':
        result = await getToppingsOrdered(JSON.parse(event.body));
        break;
      default:
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'Not Found' }),
        };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
