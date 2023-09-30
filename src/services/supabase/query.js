export async function getAvailableToppings() {
  const endpoint = '/.netlify/functions/supabase-query/availableToppings';

  try {
    const serverResponse = await fetch(endpoint, { method: 'GET' });

    if (!serverResponse.ok) {
      throw new Error(
        `Failed to fetch available toppings. Status: ${serverResponse.status} ${serverResponse.statusText}`,
      );
    }

    const toppingsData = await serverResponse.json();
    return toppingsData;
  } catch (error) {
    console.error('Error occurred while fetching available toppings:', error);
    throw error;
  }
}

export async function getSimilarToppings(embedding) {
  try {
    const response = await fetch(
      '/.netlify/functions/supabase-query/similarToppings',
      {
        method: 'POST', // Use POST since we are sending data
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ embedding }), // Include the embedding data in the request body
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error when accessing getSimilarToppings:', error);
    throw error;
  }
}

export async function getToppingsOrdered(orderId) {
  try {
    const response = await fetch(
      '/.netlify/functions/supabase-query/toppingsOrdered',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderId),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error occurred while fetching toppings ordered:', error);
    throw error;
  }
}

export async function doesOrderExist(orderId) {
  try {
    const response = await fetch(
      '/.netlify/functions/supabase-query/doesOrderExist',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderId),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error occurred while checking if order exists:', error);
    throw error;
  }
}

export async function getOrderDetails(orderId) {
  try {
    const response = await fetch(
      '/.netlify/functions/supabase-query/orderDetails',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderId),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error occurred while fetching order details:', error);
    throw error;
  }
}

export async function getCustomerDetails(customerId) {
  try {
    const response = await fetch(
      '/.netlify/functions/supabase-query/customerDetails',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerId),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error occurred while fetching customer details:', error);
    throw error;
  }
}

export default getAvailableToppings;
