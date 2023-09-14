import React from 'react';
import { useSelector } from 'react-redux';

export default function Order() {
  const description = useSelector((store) => store.pizza.description);
  const selectedToppings = useSelector((store) => store.toppings.selected);
  return (
    <>
      <h1>Summary of Your Pizza</h1>
      <p>Description: {description}</p>
      <p>Toppings: {selectedToppings}</p>
    </>
  );
}
