import React from 'react';

export default function Paragraph({ children, custom = '' }) {
  return (
    <p
      className={`block mb-2 text-xl text-gray-900 dark:text-gray-400 ${custom}`}
    >
      {children}
    </p>
  );
}
