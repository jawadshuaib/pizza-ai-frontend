import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Card from './Card';
import Loader from './Loader';
import HeaderImage from '../assets/header.png';
import { useSelector } from 'react-redux';
import FlagError from './FlagError';

export default function AppLayout() {
  const navigate = useNavigate();
  const apiLoading = useSelector((store) => store.loading.isLoading);
  const flagError = useSelector((store) => store.error.isError);
  const loadingReason = useSelector((store) => store.loading.reason);
  const isLoading = navigate.state === 'loading' || apiLoading;

  function handleBannerClick() {
    navigate('/');
  }

  return (
    <div className="grid place-items-center h-screen text-center dark:bg-gray-800">
      <Card
        headerImage={HeaderImage}
        onClick={handleBannerClick}
        alt="Header image created using Stable Diffusion"
      >
        <main>
          {flagError && <FlagError />}
          {isLoading ? <Loader reason={loadingReason} /> : <Outlet />}
        </main>
      </Card>
    </div>
  );
}
