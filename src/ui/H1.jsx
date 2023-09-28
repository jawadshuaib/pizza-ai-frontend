import React from 'react';

export default function H1({ children }) {
  return (
    <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-200">
      {children}
    </h1>
  );
}
