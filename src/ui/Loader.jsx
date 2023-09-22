import React from 'react';
import PizzaLoader from '../assets/pizza-loader.gif';
import dotsLoader from '../assets/dots-loader.svg';

export default function Loader({ type = 'pizza', reason = '' }) {
  return (
    <>
      {type === 'pizza' ? (
        <div>
          <div className="pb-10 place-items-center">
            <img src={PizzaLoader} alt="loading" className="w-20 mx-auto" />
          </div>
          <p className="block mb-2 text-xl text-gray-900 dark:text-white">
            {reason}
          </p>
        </div>
      ) : (
        <div className="py-5">
          <img className="mx-auto" src={dotsLoader} />
        </div>
      )}
    </>
  );
}
