import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import H1 from '../../ui/H1';
import Paragraph from '../../ui/Paragraph';
import {
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

export default function Status() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({});
  const [toppingIds, setToppingIds] = useState([]);

  useEffect(() => {
    if (orderId === '') return;

    getOrderDetails({ orderId }).then((order) => {
      if (order === null) return;

      // Reset all redux stores
      dispatch(resetOrder());
      dispatch(resetPizza());
      dispatch(resetToppings());

      // Save order details
      setOrderDetails(order[0]);
      // Get customer information
      getCustomerDetails({ customerId: order[0]['customer_id'] }).then(
        (customer) => {
          // Save customer email
          setOrderDetails((prevState) => ({
            ...prevState,
            email: customer[0]['email'],
          }));
        },
      );

      // Download image from supabase storage
      getImageFromSupabase(order[0]['image_url']).then((image) => {
        // Show image as UI header
        dispatch(setHeaderImage(image));
      });

      // getAvailableToppings
      // Get toppings selected
      getToppingsOrdered({ orderId }).then((toppings) => {
        // Save topping ids
        setToppingIds(toppings.map((row) => row.topping_id));

        // setToppings(
        //   availableToppings
        //     .filter((row) => {
        //       return toppings.includes(row.topping);
        //     })
        //     .map((row) => row.topping),
        // );
      });

      setLoading(false);
    });
  }, []);

  if (loading) return <Loader reason="Fetching your order details...📦" />;

  return (
    <>
      <H1>Order Completed!</H1>
      <Paragraph>
        You asked for a pizza with the toppings: {toppingIds.join(', ')}.
      </Paragraph>
      <Paragraph>Here is what 🤖 made for you:</Paragraph>
      <Paragraph custom="bg-yellow-200 rounded-md p-3">
        <span className="font-bold">{orderDetails['pizza_name']}:</span>{' '}
        {orderDetails['ai_description']}
      </Paragraph>

      <Paragraph>
        Your pizza has been mailed to <strong>{orderDetails['email']}</strong>.
      </Paragraph>
    </>
  );
}
