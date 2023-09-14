import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Card from './Card';
import Loader from './Loader';
import HeaderImage from '../assets/header.png';

export default function AppLayout() {
  const navigation = useNavigate();
  const isLoading = navigation.state === 'loading';

  function handleBannerClick() {
    navigation('/');
  }

  return (
    <div className="grid place-items-center h-screen text-center dark:bg-gray-800">
      <Card
        headerImage={HeaderImage}
        onClick={handleBannerClick}
        alt="Header image created using Stable Diffusion"
      >
        <main>{isLoading ? <Loader /> : <Outlet />}</main>
      </Card>
    </div>
  );
}
