import React from 'react';
import { useSelector } from 'react-redux';
import H1 from '../../ui/H1';
import Button from '../../ui/Button';
import Paragraph from '../../ui/Paragraph';
import { useNavigate } from 'react-router-dom';

export default function Preview() {
  const navigate = useNavigate();
  const description = useSelector((store) => store.pizza.description);
  const AIName = useSelector((store) => store.pizza.AIName);
  const AIDescription = useSelector((store) => store.pizza.AIDescription);
  const selectedToppings = useSelector((store) => store.toppings.selected);

  function handleOrderPizza() {
    navigate('/order-pizza');
  }

  return (
    <>
      <H1>{AIName !== '' ? `${AIName} Pizza...` : ``}Yummm!</H1>
      <Paragraph>
        {AIDescription !== '' ? AIDescription : description}
      </Paragraph>
      <Paragraph>
        Toppings: {selectedToppings.map((topping) => `${topping}\n`)}
      </Paragraph>
      <Button onClick={handleOrderPizza}>Order Pizza</Button>
    </>
  );
}
