import React from 'react';

export default function Input({
  placeholder = '',
  type = 'text',
  value = '',
  borderColor = 'gray-300',
  onChange = null,
}) {
  return (
    <input
      className={`text-center text-lg border border-${borderColor} rounded-md p-2.5 w-full focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
    />
  );
}
