import Insert from '../../services/supabase/insert';
import { fetchAndUploadImage } from '../../services/supabase/upload';

export default async function createOrder({
  email,
  pizzaName,
  customerDescription,
  aiDescription,
  aiImage,
  availableToppings,
  selectedToppings,
}) {
  // Create customer
  const customer = await Insert.customer({
    email,
  });
  const customerId = customer[0]['customer_id'];

  // Upload image
  // Download image from openai and then upload it to supabase storage
  const upload = await fetchAndUploadImage(aiImage);
  const imageUrl = upload.path;

  // Create order
  const order = await Insert.order({
    customerId,
    pizzaName,
    imageUrl,
    customerDescription,
    aiDescription,
  });
  const orderId = order[0]['order_id'];

  // Get topping ids selected
  const toppingIds = availableToppings
    .filter((row) => selectedToppings.includes(row.topping))
    .map((row) => row.topping_id);

  // Add toppings selected
  const orderToppings = await Insert.orderToppings({
    orderId,
    toppingIds,
  });

  return {
    customer,
    upload,
    order,
    orderToppings,
  };
}
