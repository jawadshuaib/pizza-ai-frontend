import React, { useState, useEffect } from 'react';
import Loader from '../../ui/Loader';
import { useDispatch } from 'react-redux';
import { createOrder } from '../../slices/orderSlice';
import { setError } from '../../slices/errorSlice';
import { useNavigate } from 'react-router-dom';
import { info } from '../../utils/settings';
import { isValidEmail } from '../../utils/common';
import email, { prepareEmail } from '../../services/email';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Paragraph from '../../ui/Paragraph';
import H1 from '../../ui/H1';
import { useAppSelectors } from '../../hooks/useAppSelectors';

export default function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customerEmail, setCustomerEmail] = useState('biohazard@gmail.com');
  // Border for input
  const [red, setRed] = useState(false);
  const {
    AIName,
    AIImage,
    isLoading,
    loadingReason,
    description,
    orderCompleted,
    order,
    customer,
    AIDescription,
    selectedToppings,
    availableToppings,
  } = useAppSelectors();

  useEffect(() => {
    // Guard statements
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
      const to = customer[0]['email'];
      const pizzaName = order[0]['pizza_name'];
      const imageUrl = `${info.supabaseImagePath}/${order[0]['image_url']}`;
      sendEmail(orderId, to, pizzaName, imageUrl)
        .then(() => {
          navigate(`/order/status/${orderId}`);
        })
        .catch(() => {
          dispatch(
            setError([
              true,
              'Your order is complete but we had an error trying to send you an email.',
            ]),
          );
        });
    }

    if (isValidEmail(setCustomerEmail)) {
      setRed(false);
    }
  }, [customerEmail]);

  const handleSubmitOrder = async () => {
    if (customerEmail === '' || !isValidEmail(customerEmail)) {
      setRed(true);
      return;
    }

    setRed(false);

    // Once the order is created, it is automatically marked as completed
    dispatch(
      createOrder({
        email: customerEmail,
        pizzaName: AIName,
        customerDescription: description,
        aiDescription: AIDescription,
        aiImage: AIImage,
        availableToppings,
        selectedToppings,
      }),
    );
  };

  function sendEmail(orderId, to, pizzaName, imageUrl) {
    const { from, subject, text } = prepareEmail({
      orderId,
      pizzaName,
      imageUrl,
    });

    const fn = async () => {
      return await email({
        to,
        from,
        subject,
        text,
      });
    };

    try {
      return fn();
    } catch (err) {
      return err;
    }
  }

  return (
    <>
      {isLoading && <Loader reason={loadingReason} />}
      <H1>Pizza is Ready!</H1>
      <Paragraph>
        Enter your email to receive this pizza in your mailbox.
      </Paragraph>
      <div className="block">
        <Input
          placeholder="name@email.com"
          type="email"
          value={customerEmail}
          borderColor={red ? 'red-500' : 'gray-300'}
          onChange={(e) => setCustomerEmail(e.target.value)}
        />
        <Button onClick={handleSubmitOrder}>Mail My Pizza</Button>
      </div>
    </>
  );
}
