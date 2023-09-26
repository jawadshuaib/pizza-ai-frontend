import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import H1 from '../../ui/H1';
import Paragraph from '../../ui/Paragraph';
import getAvailableToppings, {
  getCustomerDetails,
  getOrderDetails,
  getToppingsOrdered,
} from '../../services/supabase/query';
import Loader from '../../ui/Loader';
import { getImageFromSupabase } from '../../services/supabase/upload';
import { setHeaderImage, reset as resetOrder } from '../../slices/orderSlice';
import { reset as resetToppings } from '../../slices/toppingsSlice';
import { reset as resetPizza } from '../../slices/pizzaSlice';
import { useDispatch } from 'react-redux';
import sendEmail, { prepareEmail } from '../../services/send-email';

export default function Status() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderDetails, setOrderDetails] = useState({});
  const [toppings, setToppings] = useState([]);

  useEffect(() => {
    if (orderId === '') return;

    const fetchOrder = async () => {
      try {
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

  function handleSendEmail() {
    const { from, subject, text } = prepareEmail({
      orderId,
      pizzaName: orderDetails['pizza_name'],
    });

    const fn = async () => {
      await sendEmail({
        to: 'biohazard@gmail.com',
        from,
        subject,
        text,
      });
    };

    try {
      fn();
    } catch (err) {
      console.log(`There was an error: ${err}`);
    }
  }

  return (
    <>
      <H1>Order Completed!</H1>
      <Paragraph>
        You asked for a pizza with the toppings: {toppings.join(', ')}.
      </Paragraph>
      <Paragraph>Here is what 🤖 made for you:</Paragraph>
      <Paragraph custom="bg-yellow-200 rounded-md p-3">
        <span className="font-bold">{orderDetails['pizza_name']}:</span>{' '}
        {orderDetails['ai_description']}
      </Paragraph>

      <Paragraph>
        Your pizza has been mailed to <strong>{orderDetails['email']}</strong>.
      </Paragraph>
      <button onClick={handleSendEmail}>Send Email</button>
    </>
  );
}
