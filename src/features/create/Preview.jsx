import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import H1 from '../../ui/H1';
import Button from '../../ui/Button';
import Loader from '../../ui/Loader';
import Paragraph from '../../ui/Paragraph';
import Image from '../../ui/Image';

export default function Preview() {
  const navigate = useNavigate();
  const AIName = useSelector((store) => store.pizza.AIName);
  const AIImage = useSelector((store) => store.pizza.AIImage);
  const description = useSelector((store) => store.pizza.description);
  const AIDescription = useSelector((store) => store.pizza.AIDescription);
  const selectedToppings = useSelector((store) => store.toppings.selected);

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
