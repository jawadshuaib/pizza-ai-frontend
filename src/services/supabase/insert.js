export async function customer(email) {
  try {
    const response = await fetch(
      '/.netlify/functions/supabase-insert/insertCustomer',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to insert customer. Status: ${response.status} ${response.statusText}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error('Error occurred while inserting customer:', error);
    throw error;
  }
}

export async function order(
  customerId,
  pizzaName,
  imageUrl,
  customerDescription,
  aiDescription,
) {
  try {
    const response = await fetch(
      '/.netlify/functions/supabase-insert/insertOrder',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          pizzaName,
          imageUrl,
          customerDescription,
          aiDescription,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to insert customer. Status: ${response.status} ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error occurred while inserting customer:', error);
    throw error;
  }
}

export async function orderToppings(orderId, toppingIds) {
  try {
    const response = await fetch(
      '/.netlify/functions/supabase-insert/insertToppings',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          toppingIds,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to insert customer. Status: ${response.status} ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error occurred while inserting customer:', error);
    throw error;
  }
}

export default { customer, order, orderToppings };
