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

export default function Status() {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({});
  // const [customerDetails, setCustomerDetails] = useState({});
  const [toppingIds, setToppingIds] = useState([]);

  useEffect(() => {
    if (orderId === '') return;

    getOrderDetails({ orderId }).then((order) => {
      if (order === null) return;

      // Save order details
      setOrderDetails(order[0]);
      // Get customer information
      getCustomerDetails({ customerId: order[0]['customer_id'] }).then(
        (customer) => {
          // Save customer details
          console.log(`Customer: ${customer}`);
          // setOrderDetails((prevState) => ({
          //   ...prevState,
          //   ...customer[0]['email'],
          // }));
        },
      );

      // Get toppings selected
      getToppingsOrdered({ orderId }).then((toppings) => {
        // Save topping ids
        setToppingIds(toppings.map((row) => row.topping_id));
      });

      setLoading(false);
    });
  }, []);

  console.log(orderDetails.order_id, toppingIds);

  if (loading) return <Loader reason="Fetching your order details...📦" />;

  return (
    <>
      <H1>Order Completed!</H1>
      <Paragraph>We have mailed your pizza to you!</Paragraph>
    </>
  );
}
