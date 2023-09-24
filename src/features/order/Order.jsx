import React, { useEffect } from 'react';
import Loader from '../../ui/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../slices/orderSlice';
import { useNavigate } from 'react-router-dom';

export default function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const AIName = useSelector((store) => store.pizza.AIName);
  const AIImage = useSelector((store) => store.pizza.AIImage);
  const isLoading = useSelector((store) => store.loading.isLoading);
  const loadingReason = useSelector((store) => store.loading.reason);
  const description = useSelector((store) => store.pizza.description);
  const orderCompleted = useSelector((store) => store.order.completed);
  const order = useSelector((store) => store.order.order);
  const AIDescription = useSelector((store) => store.pizza.AIDescription);
  const selectedToppings = useSelector((store) => store.toppings.selected);
  const availableToppings = useSelector((store) => store.toppings.available);

  useEffect(() => {
    if (
      selectedToppings.length === 0 ||
      AIName === '' ||
      AIDescription === '' ||
      AIImage === '' ||
      description === ''
    ) {
      navigate('/');
      return;
    }

    if (orderCompleted) {
      const orderId = order[0]['order_id'];
      navigate(`/order/status/${orderId}`);
    }
  }, []);

  const handleSubmitOrder = async () => {
    dispatch(
      createOrder({
        email: 'jawad.php@gmail.com',
        pizzaName: AIName,
        customerDescription: description,
        aiDescription: AIDescription,
        aiImage: AIImage,
        availableToppings,
        selectedToppings,
      }),
    );
  };

  return (
    <>
      {isLoading && <Loader reason={loadingReason} />}
      <button onClick={handleSubmitOrder}>Submit Order</button>
    </>
  );
}
