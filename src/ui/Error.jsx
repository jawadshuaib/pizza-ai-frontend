import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import Button from './Button';
import Card from './Card';
import HeaderImage from '../assets/header.png';
import H1 from './H1';
import Paragraph from './Paragraph';
import Flag from './Flag';

export default function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  const handleGoBack = () => {
    navigate(-1);
  };

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
        <H1>Oops! Something Went Wrong</H1>
        <Paragraph>{`Sorry about that. Here's what we know:`}</Paragraph>
        <Flag color="yellow">
          {error.error?.message || error.statusText || error.data}
        </Flag>
        <Button onClick={handleGoBack}>Go Back</Button>
      </Card>
    </div>
  );
}
