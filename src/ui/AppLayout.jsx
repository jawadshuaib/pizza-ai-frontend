import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Card from './Card';
import Loader from './Loader';
import midJourneyImage from '../assets/header.png';
import { useSelector } from 'react-redux';
import FlagError from './FlagError';

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const apiLoading = useSelector((store) => store.loading.isLoading);
  // Listen to errors relating to API loading
  const apiError = useSelector((store) => store.error.isError);
  const loadingReason = useSelector((store) => store.loading.reason);
  const isLoading = navigate.state === 'loading' || apiLoading;
  const generatedImage = useSelector((store) => store.order.headerImage);

  // Show the AI generated pizza image if available
  const headerImage =
    location.pathname.includes('/order/') && generatedImage !== ''
      ? generatedImage
      : midJourneyImage;

  function handleBannerClick() {
    navigate('/');
  }

  return (
    <div className="grid place-items-center h-screen text-center dark:bg-gray-800">
      <Card
        headerImage={headerImage}
        onClick={handleBannerClick}
        alt="Header image created using Stable Diffusion"
      >
        <main>
          {apiError && <FlagError />}
          {isLoading ? <Loader reason={loadingReason} /> : <Outlet />}
        </main>
      </Card>
    </div>
  );
}
