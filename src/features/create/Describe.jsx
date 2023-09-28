import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
// UI
import { H1, Button, Loader } from '../../ui';
// Slices
import {
  saveDescription,
  setAvailableToppings,
  setSuggestedToppings,
} from '../../slices';
// Services
import { getAvailableToppings } from '../../services';
// Selectors
import { useAppSelectors } from '../../hooks/useAppSelectors';

export default function Describe() {
  const defaultDescription =
    'Make me a pizza with toppings that begin with the letter A.';
  const [description, setDescription] = useState(defaultDescription);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [availableToppings] = useLoaderData();
  const { suggestedToppings, isLoading, loadingReason } = useAppSelectors();

  useEffect(() => {
    // Guard statement to make sure we have received suggested toppings
    // from openai API before navigating
    if (suggestedToppings.length === 0) return;

    navigate('/create-pizza/toppings');
  }, [suggestedToppings]);

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
  };

  return (
    <>
      <H1>{`Let's Make You a Pizza!`}</H1>
      {isLoading && <Loader reason={loadingReason} />}
      {!isLoading && (
        <>
          <label
            htmlFor="description"
            className="block mb-2 text-xl text-gray-400 dark:text-gray-400"
          >
            What are you craving?
            <textarea
              id="description"
              rows="4"
              className="block my-3 p-2.5 w-full text-2xl text-center text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={defaultDescription}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </label>

          <Button onClick={handleCreatePizza}>
            <p>Create Pizza</p>
          </Button>
        </>
      )}
    </>
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
