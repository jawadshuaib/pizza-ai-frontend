import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// UI
import { H1, Loader, Paragraph } from '../../ui';
// Slices
import {
  setHeaderImage,
  resetOrder,
  resetToppings,
  resetPizza,
} from '../../slices';
// Services
import {
  getAvailableToppings,
  getCustomerDetails,
  getOrderDetails,
  doesOrderExist,
  getToppingsOrdered,
  getImageFromSupabase,
} from '../../services';

export default function Status() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderDetails, setOrderDetails] = useState({});
  const [toppings, setToppings] = useState([]);

  useEffect(() => {
    if (orderId === '') return;

    const fetchOrder = async () => {
      try {
        // ## Check if order exists ##
        const orderExists = await doesOrderExist({ orderId });
        if (orderExists !== true) {
          navigate('/');
          return;
        }

        // ## Fetch order details ##
        const order = await getOrderDetails({ orderId });
        if (order === null) return;

        // Reset all redux stores
        dispatch(resetOrder());
        dispatch(resetPizza());
        dispatch(resetToppings());

        // Save order details
        setOrderDetails(order[0]);

        // ## Fetch customer details ##
        const customer = await getCustomerDetails({
          customerId: order[0]['customer_id'],
        });
        // Save customer email
        setOrderDetails((prevState) => ({
          ...prevState,
          email: customer[0]['email'],
        }));

        // ## Download image from supabase storage
        const image = await getImageFromSupabase(order[0]['image_url']);
        dispatch(setHeaderImage(image));

        // ## Fetch toppings selected ##
        const toppingIds = await getToppingsOrdered({ orderId });
        const toppingIdsArr = toppingIds.map((topping) => topping.topping_id);

        const availableToppings = await getAvailableToppings();

        // Name of toppings selected
        setToppings(
          availableToppings
            .filter((available) => {
              return toppingIdsArr.includes(available.topping_id);
            })
            .map((available) => available.topping),
        );
      } catch (err) {
        setError(err);
      }
    };

    fetchOrder();
    setLoading(false);
  }, []);

  if (loading) return <Loader reason="Fetching your order details...📦" />;
  if (error !== '') return <Paragraph>{error}</Paragraph>;

  return (
    <>
      <H1>Order Completed!</H1>
      <Paragraph>
        You asked for a pizza with the toppings: {toppings.join(', ')}.
      </Paragraph>
      <Paragraph>Here is what 🤖 made for you:</Paragraph>
      <Paragraph custom="bg-yellow-200 rounded-md p-3 dark:text-gray-600">
        <span className="font-bold">{orderDetails['pizza_name']}:</span>{' '}
        {orderDetails['ai_description']}
      </Paragraph>

      <Paragraph>
        Your pizza has been mailed to <strong>{orderDetails['email']}</strong>.
      </Paragraph>
    </>
  );
}
