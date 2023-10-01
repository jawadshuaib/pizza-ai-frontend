import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Selectors
import { useAppSelectors } from '../../hooks/useAppSelectors';
// UI
import { H1, Button, Loader, Paragraph, Image } from '../../ui';

export default function Preview() {
  const navigate = useNavigate();
  const { AIName, AIImage, description, AIDescription, selectedToppings } =
    useAppSelectors();

  useEffect(() => {
    if (description === '' || selectedToppings.length === 0) {
      navigate(-1);
    }
  }, []);

  function handleOrderPizza() {
    navigate('/order/pizza');
  }

  return (
    <>
      <H1>{AIName !== '' ? `${AIName}...Yummm!` : ``}</H1>

      {AIImage !== '' ? (
        <>
          <Image src={AIImage} alt={AIName} />
          <Paragraph custom="bg-yellow-200 rounded-md p-3 mt-3 dark:text-gray-600">
            {AIDescription !== '' ? AIDescription : description}
          </Paragraph>
        </>
      ) : (
        <Loader type="dots" />
      )}

      {AIImage !== '' && AIName !== '' && AIDescription !== '' && (
        <Button onClick={handleOrderPizza}>Order Pizza</Button>
      )}
    </>
  );
}
