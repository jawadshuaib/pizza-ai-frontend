// Query Supabase database using netlify/functions/supabase-query.js:
async function fetchData(action, method = 'GET', body = null) {
  const url = `/.netlify/functions/supabase-query/${action}`;
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) options.body = JSON.stringify(body);

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error occurred while fetching data:', error);
    throw error;
  }
}

export async function getAvailableToppings() {
  const action = 'availableToppings';
  return await fetchData(action);
}

export async function getSimilarToppings(embedding) {
  const action = 'similarToppings';
  return await fetchData(action, 'POST', { embedding });
}

export async function getToppingsOrdered(orderId) {
  const action = 'toppingsOrdered';
  return await fetchData(action, 'POST', orderId);
}

export async function doesOrderExist(orderId) {
  const action = 'doesOrderExist';
  return await fetchData(action, 'POST', orderId);
}

export async function getOrderDetails(orderId) {
  const action = 'orderDetails';
  return await fetchData(action, 'POST', orderId);
}

export async function getCustomerDetails(customerId) {
  const action = 'customerDetails';
  return await fetchData(action, 'POST', customerId);
}
