import React from 'react';

export default function Paragraph({ children }) {
  return (
    <p className="block mb-2 text-xl text-gray-900 dark:text-white">
      {children}
    </p>
  );
}
