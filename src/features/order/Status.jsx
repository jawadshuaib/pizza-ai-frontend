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
// import Image from '../../ui/Image';
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
  // const [image, setImage] = useState('');

  useEffect(() => {
    if (orderId === '') return;

    getOrderDetails({ orderId }).then((order) => {
      if (order === null) return;

      // Reset redux stores
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
        // Save image
        // setImage(image);

        dispatch(setHeaderImage(image));
      });

      // Get toppings selected
      getToppingsOrdered({ orderId }).then((toppings) => {
        // Save topping ids
        setToppingIds(toppings.map((row) => row.topping_id));
      });

      setLoading(false);
    });
  }, []);

  console.log(toppingIds, orderDetails);
  if (loading) return <Loader reason="Fetching your order details...📦" />;

  return (
    <>
      <H1>Order Completed!</H1>
      <Paragraph>Your pizza has been mailed.</Paragraph>
      {/* {image !== '' && <Image src={image} alt={orderDetails['pizza_name']} />} */}
    </>
  );
}
