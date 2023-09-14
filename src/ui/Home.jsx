import { useNavigate } from 'react-router-dom';
import React from 'react';
import Button from './Button';

export default function Home() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/create-pizza/describe');
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        <p>Create Pizza with AI</p>
      </h1>
      <Button onClick={handleStart}>Start Making Your Pizza</Button>
    </>
  );
}
