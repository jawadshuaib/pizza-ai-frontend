import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Loader from './Loader';

export default function AppLayout() {
  const navigation = useNavigate();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="bg-white h-screen text-center dark:bg-gray-800">
      <header>
        <Link to="/" className="text-black dark:text-white">
          Homepage
        </Link>
      </header>
      <main>{isLoading ? <Loader /> : <Outlet />}</main>
    </div>
  );
}
