import React from 'react';
import PizzaLoader from '../assets/pizza-loader.gif';

export default function Loader({ reason = '' }) {
  return (
    <>
      <div className="py-10 place-items-center">
        <img src={PizzaLoader} alt="loading" className="w-20 mx-auto" />
      </div>
      <p className="block mb-2 text-xl text-gray-900 dark:text-white">
        {reason}
      </p>
    </>
  );
}
