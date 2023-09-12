import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import Button from './Button';

export default function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <h1>Error</h1>
      <p>{error.data || error.message}</p>
      <Button onClick={handleGoBack}>Go Back</Button>
    </div>
  );
}
