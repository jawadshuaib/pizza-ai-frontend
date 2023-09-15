import React from 'react';
import { useSelector } from 'react-redux';
import H1 from '../../ui/H1';
import Button from '../../ui/Button';
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
      <p className="block mb-2 text-xl text-gray-900 dark:text-white">
        {AIDescription !== '' ? AIDescription : description}
      </p>
      <p className="block mb-2 text-xl text-gray-900 dark:text-white">
        Toppings: {selectedToppings.map((topping) => `${topping}\n`)}
      </p>
      <Button onClick={handleOrderPizza}>Order Pizza</Button>
    </>
  );
}
