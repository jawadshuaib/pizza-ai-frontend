import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../ui/Button';

export default function Describe() {
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const handleCreatePizza = () => {
    // This should call API to create a pizza
    navigate('/create-pizza/toppings');
  };
  return (
    <div>
      <label
        htmlFor="description"
        className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"
      >
        What are you craving?
        <textarea
          id="description"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Large vegetarian pizza with extra cheese"
          onChange={(e) => setDescription(e.target.value)}
        >
          {description}
        </textarea>
      </label>
      <Button onClick={handleCreatePizza}>Create Pizza</Button>
    </div>
  );
}
