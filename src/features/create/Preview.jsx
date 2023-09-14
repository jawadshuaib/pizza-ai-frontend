import React from 'react';
import { useSelector } from 'react-redux';
import H1 from '../../ui/H1';
import Button from '../../ui/Button';

export default function Preview() {
  const description = useSelector((store) => store.pizza.description);
  const selectedToppings = useSelector((store) => store.toppings.selected);
  return (
    <>
      <H1>Yummm!</H1>
      <p>Pizza has been created.</p>
      <p>Description: {description}</p>
      <p>Toppings: {selectedToppings.map((topping) => `${topping} `)}</p>
      <Button>Order Pizza</Button>
    </>
  );
}
