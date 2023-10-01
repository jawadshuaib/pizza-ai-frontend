// Insert data into Supabase via netlify/functions/supabase-insert.js:
async function postData(action, data) {
  const url = `/.netlify/functions/supabase-insert/${action}`;
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(
        `Failed to post data. Status: ${response.status} ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Error occurred while posting data to ${url}:`, error);
    throw error;
  }
}

export async function customer(email) {
  const action = 'insertCustomer';
  return await postData(action, { email });
}

export async function order(
  customerId,
  pizzaName,
  imageUrl,
  customerDescription,
  aiDescription,
) {
  const action = 'insertOrder';
  return await postData(action, {
    customerId,
    pizzaName,
    imageUrl,
    customerDescription,
    aiDescription,
  });
}

export async function orderToppings(orderId, toppingIds) {
  const action = 'insertToppings';
  return await postData(action, { orderId, toppingIds });
}

export default { customer, order, orderToppings };
