import supabase from './supabase';

const customer = async ({ email }) => {
  const { data } = await supabase
    .from('customers')
    .insert([{ email }])
    .select();

  return data;
};

const order = async ({
  customerId,
  pizzaName,
  imageUrl,
  customerDescription,
  aiDescription,
}) => {
  const { data } = await supabase
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

  return data;
};

const orderToppings = async ({ orderId, toppingIds }) => {
  const inserts = toppingIds.map((toppingId) => ({
    order_id: orderId,
    topping_id: toppingId,
  }));

  const { data } = await supabase
    .from('order_toppings')
    .insert([...inserts])
    .select();

  return data;
};

export default { customer, order, orderToppings };
