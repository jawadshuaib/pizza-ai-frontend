import { useNavigate } from 'react-router-dom';
import React from 'react';
import Button from './Button';
import askAIToSuggestToppings from '../services/get-toppings';

export default function Home() {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate('/create-pizza/describe');
  };

  const handleSuggestToppings = () => {
    askAIToSuggestToppings(
      'What toppings should I put on my vegetarian pizza?',
    );
  };

  return (
    <h1>
      <Button onClick={handleStart}>Start</Button>
      <Button onClick={handleSuggestToppings}>
        Ask AI to Suggest Toppings
      </Button>
    </h1>
  );
}
