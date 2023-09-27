import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelectors } from '../../hooks/useAppSelectors';
import H1 from '../../ui/H1';
import Button from '../../ui/Button';
import Loader from '../../ui/Loader';
import Paragraph from '../../ui/Paragraph';
import Image from '../../ui/Image';

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
          <Paragraph>
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
