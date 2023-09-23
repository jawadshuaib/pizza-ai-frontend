import { useLoaderData, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { saveDescription } from '../../slices/pizzaSlice';
import getAvailableToppings from '../../services/supabase/query';
import { mode } from '../../utils/settings';
// import { toLowerCaseArray } from '../../utils/common';
import Button from '../../ui/Button';
import H1 from '../../ui/H1';
import {
  setAvailableToppings,
  setSuggestedToppings,
} from '../../slices/toppingsSlice';

export default function Describe() {
  const [description, setDescription] = useState(
    mode.isDevelopment ? 'Large vegetarian pizza with extra cheese.' : '',
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [availableToppings] = useLoaderData();

  const handleCreatePizza = () => {
    if (description === '') return;
    // Store availableToppings in Redux store
    dispatch(setAvailableToppings(availableToppings));

    // Get suggested toppings from openai API
    // and save it to Redux store
    const toppings = availableToppings.map((row) => row.topping);
    dispatch(setSuggestedToppings(toppings, description));

    // Save description to Redux store
    // We will use this description to create the prompt
    // for openai API
    dispatch(saveDescription(description));
    navigate('/create-pizza/toppings');
  };

  return (
    <div>
      <H1>{`Let's Make You a Pizza!`}</H1>
      <label
        htmlFor="description"
        className="block mb-2 text-xl text-gray-400 dark:text-white"
      >
        What are you craving?
        <textarea
          id="description"
          rows="4"
          className="block my-3 p-2.5 w-full text-2xl text-center text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Vegetarian pizza with three popular toppings."
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

export async function loader() {
  const availableToppings = async () => {
    const available = await getAvailableToppings();
    return available.map((row) => {
      return { ...row, topping: row.topping.toLowerCase() };
    });
    // return toLowerCaseArray(available.map((row) => row.topping));
  };

  const loader1 = await availableToppings();

  return [loader1];
}
