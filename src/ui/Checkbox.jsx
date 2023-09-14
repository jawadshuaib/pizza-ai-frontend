import React, { useState } from 'react';
import { capitalizeFirstLetters, strToKey } from '../utils/common';

export default function Checkbox({
  option,
  isChecked = false,
  onClick = null,
}) {
  const [checked, setChecked] = useState(isChecked);
  const key = strToKey(option);

  function handleChecked() {
    setChecked(!checked);

    if (onClick) {
      onClick(option);
    }
  }
  return (
    <>
      <div className="flex items-center pl-3">
        <input
          id={key}
          type="checkbox"
          value={option}
          checked={checked}
          onChange={handleChecked}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
        />
        <label
          htmlFor={key}
          className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {capitalizeFirstLetters(option)}
        </label>
      </div>
    </>
  );
}
