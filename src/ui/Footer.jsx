import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="mt-1 cursor-pointer text-gray-400 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400">
      <Link to="/about">Created by Jawad Shuaib</Link>
    </div>
  );
}
