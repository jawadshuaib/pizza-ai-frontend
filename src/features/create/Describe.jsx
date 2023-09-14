import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAvailableToppings,
  setSuggestedToppings,
} from '../../slices/toppingsSlice';
import { saveDescription } from '../../slices/pizzaSlice';
import H1 from '../../ui/H1';

export default function Describe() {
  const [description, setDescription] = useState(
    'Large vegetarian pizza with extra cheese.',
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const availableToppings = useSelector((store) => store.toppings.available);

  useEffect(() => {
    // Get available toppings from API
    // and save it to Redux store
    dispatch(setAvailableToppings());
  }, []);

  const handleCreatePizza = () => {
    if (description === '') return;
    // Save description to Redux store
    // We will use this description to create the prompt
    // for openai API
    dispatch(saveDescription(description));

    // Get suggested toppings from openai API
    // and save it to Redux store
    dispatch(setSuggestedToppings(availableToppings, description));

    navigate('/create-pizza/toppings');
  };

  return (
    <div>
      <H1>{`Let's Make You a Pizza!`}</H1>
      <label
        htmlFor="description"
        className="block mb-2 text-xl text-gray-900 dark:text-white"
      >
        What are you craving?
        <textarea
          id="description"
          rows="4"
          className="block my-3 p-2.5 w-full text-lg text-center text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Large vegetarian pizza with extra cheese."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </label>

      <Button onClick={handleCreatePizza}>
        <p>Create Pizza</p>
      </Button>
    </div>
  );
}
