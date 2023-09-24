import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedToppings } from '../../slices/toppingsSlice';
import Checkbox from '../../ui/Checkbox';
import Button from '../../ui/Button';
import H1 from '../../ui/H1';
import {
  generateAndSetAIImage,
  setAISuggestions,
} from '../../slices/pizzaSlice';
import Paragraph from '../../ui/Paragraph';

export default function Toppings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const availableToppings = useSelector((store) => store.toppings.available);
  const suggestedToppings = useSelector((store) => store.toppings.suggested);

  const [showAllOptionsBtn, setShowAllOptionsBtn] = useState(true);
  const [toppings, setToppings] = useState([]);

  useEffect(() => {
    if (availableToppings.length === 0 || suggestedToppings.length === 0) {
      navigate(-1);
    }

    // Filter available toppings to only show suggested toppings
    // when the component mounts for the first time
    // Note: the returned values are an array of STRINGS containing toppings
    setToppings(
      availableToppings
        .filter((row) => {
          return suggestedToppings.includes(row.topping);
        })
        .map((row) => row.topping),
    );
  }, []);

  // Note that initially, the selected toppings are the suggested toppings
  let selectedToppings = suggestedToppings;

  // Pass this function to Checkbox component
  function handleSelection(topping) {
    const isChecked = selectedToppings.includes(topping);

    // Add or remove topping from selected toppings
    // based on whether they are checked or not
    selectedToppings = isChecked
      ? selectedToppings.filter((item) => item !== topping)
      : [...selectedToppings, topping];
  }

  function handleShowAllToppings() {
    // Show all available toppings
    setToppings(() => availableToppings);
    // Hide button after user clicks it
    setShowAllOptionsBtn(false);
  }

  function handlePreviewPizza() {
    // Save selected options to Redux store
    dispatch(updateSelectedToppings(selectedToppings));
    dispatch(setAISuggestions(selectedToppings));
    dispatch(generateAndSetAIImage(selectedToppings));

    navigate('/create-pizza/preview');
  }

  if (availableToppings.length === 0) return null;

  if (!Array.isArray(suggestedToppings)) return null;

  return (
    <>
      <H1>Pick Your Toppings</H1>
      <Paragraph>
        We suggest the following toppings based on your craving:
      </Paragraph>
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
