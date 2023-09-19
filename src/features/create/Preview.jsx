import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import H1 from '../../ui/H1';
import Button from '../../ui/Button';
import Paragraph from '../../ui/Paragraph';
import { useNavigate } from 'react-router-dom';
import Loader from '../../ui/Loader';
// import { uploadImageToSupabase } from '../../services/upload-image-to-supabase';
// import { imageToBase64 } from '../../utils/common';

export default function Preview() {
  const navigate = useNavigate();
  const description = useSelector((store) => store.pizza.description);
  const AIName = useSelector((store) => store.pizza.AIName);
  const AIDescription = useSelector((store) => store.pizza.AIDescription);
  const AIImage = useSelector((store) => store.pizza.AIImage);
  const selectedToppings = useSelector((store) => store.toppings.selected);

  useEffect(() => {
    if (description === '' || selectedToppings.length === 0) {
      navigate(-1);
    }
  }, []);

  function handleOrderPizza() {
    // const convertedImage = imageToBase64({ file: `${AIImage}.png` });
    // console.log(convertedImage);
    // uploadImageToSupabase(convertedImage).then((data) => {
    //   console.log(data);
    // });
    navigate('/order-pizza');
  }

  return (
    <>
      <H1>{AIName !== '' ? `${AIName} Pizza...` : ``}Yummm!</H1>

      {AIImage !== '' ? (
        <img className="mx-auto rounded-md" src={AIImage} alt={AIName} />
      ) : (
        <Loader type="dots" />
      )}
      <Paragraph>
        {AIDescription !== '' ? AIDescription : description}
      </Paragraph>

      <Button onClick={handleOrderPizza}>Order Pizza</Button>
    </>
  );
}
