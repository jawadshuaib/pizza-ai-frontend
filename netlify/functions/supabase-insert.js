/* eslint-env node */
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const { SUPABASE_URL, SUPABASE_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('SUPABASE_URL and SUPABASE_KEY must be provided');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function customer({ email }) {
  const { data, error } = await supabase
    .from('customers')
    .insert([{ email }])
    .select();

  return { data, error };
}

async function order({
  customerId,
  pizzaName,
  imageUrl,
  customerDescription,
  aiDescription,
}) {
  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        customer_id: customerId,
        pizza_name: pizzaName,
        image_url: imageUrl,
        customer_description: customerDescription,
        ai_description: aiDescription,
      },
    ])
    .select();

  return { data, error };
}

async function orderToppings({ orderId, toppingIds }) {
  const inserts = toppingIds.map((toppingId) => ({
    order_id: orderId,
    topping_id: toppingId,
  }));

  const { data, error } = await supabase
    .from('order_toppings')
    .insert([...inserts])
    .select();

  return { data, error };
}

export async function handler(event) {
  try {
    const pathArray = event.path.split('/');
    const action = pathArray[pathArray.length - 1];

    let result;
    const body = JSON.parse(event.body);
    switch (action) {
      case 'insertCustomer':
        result = await customer(body);
        if (result.error) throw result.error;
        break;
      case 'insertOrder':
        result = await order(body);
        if (result.error) throw result.error;
        break;
      case 'insertToppings':
        result = await orderToppings(body);
        if (result.error) throw result.error;
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
