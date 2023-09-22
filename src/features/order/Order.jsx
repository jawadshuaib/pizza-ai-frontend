import React from 'react';
import Loader from '../../ui/Loader';
import { fetchAndUploadImage } from '../../services/supabase/upload';
// import { useDispatch } from 'react-redux';
import Insert from '../../services/supabase/insert';
import { useSelector } from 'react-redux';

export default function Order() {
  const [image] = React.useState('');
  // const dispatch = useDispatch();
  const description = useSelector((store) => store.pizza.description);
  const AIName = useSelector((store) => store.pizza.AIName);
  const AIDescription = useSelector((store) => store.pizza.AIDescription);
  // const AIImage = useSelector((store) => store.pizza.AIImage);
  const availableToppings = useSelector((store) => store.toppings.available);
  const selectedToppings = useSelector((store) => store.toppings.selected);

  const handleSubmitOrder = async () => {
    if (selectedToppings.length === 0) return null;

    // Create customer
    const customer = await Insert.customer({
      email: 'jawad.php@gmail.com',
    });
    const customerId = customer[0]['customer_id'];

    // Upload image
    const AIImage = `https://oaidalleapiprodscus.blob.core.windows.net/private/org-fjrJOPSACALV6hQYyDaufQ2g/user-LZMlgSZCBAhrIkOmf8ooTgu9/img-RY3qvpM1VqY2FTFwVuGj7yTl.png?st=2023-09-22T00%3A57%3A34Z&se=2023-09-22T02%3A57%3A34Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-09-21T22%3A04%3A24Z&ske=2023-09-22T22%3A04%3A24Z&sks=b&skv=2021-08-06&sig=BQnBgJMQ2px/AO4NqrW9vw5KRnM84iADZUS7j4r4XBc%3D`;
    // Download image from openai and then upload it to supabase
    const upload = await fetchAndUploadImage(AIImage);
    const imageUrl = upload.path;

    // Create order
    const order = await Insert.order({
      customerId,
      pizzaName: AIName,
      imageUrl,
      customerDescription: description,
      aiDescription: AIDescription,
    });
    const orderId = order[0]['order_id'];
    console.log(orderId);

    // Get topping ids selected
    const toppingIds = availableToppings
      .filter((row) => selectedToppings.includes(row.topping))
      .map((row) => row.topping_id);

    // Add toppings selected
    const orderToppings = await Insert.orderToppings({
      orderId,
      toppingIds,
    });

    if (orderToppings.length > 0) {
      console.log('Insert successful');
    }
  };

  return (
    <>
      <Loader reason="Ordering a pizza for you..." />
      <button onClick={handleSubmitOrder}>Submit Order</button>
      {image !== null && <img src={image} />}
    </>
  );
}
