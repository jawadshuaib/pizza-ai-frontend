import React from 'react';

export default function Href({ children, href = '', target = '_blank' }) {
  return (
    <a
      href={href}
      target={target}
      rel="noopener noreferrer"
      className=" underline hover:text-blue-500 dark:text-blue-200"
    >
      {children}
    </a>
  );
}
