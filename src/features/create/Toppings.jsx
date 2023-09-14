import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedToppings } from '../../slices/toppingsSlice';
import Checkbox from '../../ui/Checkbox';
import Button from '../../ui/Button';
import H1 from '../../ui/H1';

export default function Toppings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toppings, setToppings] = useState([]);
  const [showAllOptionsBtn, setShowAllOptionsBtn] = useState(true);

  const availableToppings = useSelector((store) => store.toppings.available);
  const suggestedToppings = useSelector((store) => store.toppings.suggested);

  useEffect(() => {
    // Filter available toppings to only show suggested toppings
    // when the component mounts for the first time
    setToppings(
      availableToppings.filter((topping) =>
        suggestedToppings.includes(topping),
      ),
    );
  }, []);

  // Note that initially, the selected toppings are the suggested toppings
  let selectedToppings = suggestedToppings;

  // Pass this function to Checkbox component
  function handleSelection(topping) {
    const isChecked = selectedToppings.includes(topping);
    console.log(topping, isChecked);
    // selectedToppings can differ from suggestedToppings
    // if the user has manually selected or deselected a topping
    selectedToppings = isChecked
      ? suggestedToppings.filter((item) => item !== topping)
      : [...suggestedToppings, topping];
  }

  function handleShowAllToppings() {
    // Show all available toppings
    setToppings(() => availableToppings);
    // Hide button after user clicks it
    setShowAllOptionsBtn(false);
  }

  function handlePreviewPizza() {
    // Save selected toppings to Redux store
    dispatch(updateSelectedToppings(selectedToppings));
    navigate('/create-pizza/preview');
  }

  if (availableToppings.length === 0) return null;

  if (!Array.isArray(suggestedToppings)) return null;

  return (
    <>
      <H1>Pick Your Toppings</H1>
      <ul className="text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {toppings.map((topping) => (
          <li
            key={topping}
            className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
          >
            <Checkbox
              option={topping}
              isChecked={suggestedToppings.includes(topping)}
              onClick={handleSelection}
            />
          </li>
        ))}
        {showAllOptionsBtn && (
          <li className="p-3 text-blue-600">
            <button onClick={handleShowAllToppings}>Show All Options</button>
          </li>
        )}
      </ul>
      <Button onClick={handlePreviewPizza}>Preview Pizza</Button>
    </>
  );
}
