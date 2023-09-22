import React, { useEffect } from 'react';
import Loader from '../../ui/Loader';
// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import createOrder from './createOrder';
import { useNavigate } from 'react-router-dom';

export default function Order() {
  const navigate = useNavigate();
  const [image] = React.useState('');
  const AIName = useSelector((store) => store.pizza.AIName);
  const AIImage = useSelector((store) => store.pizza.AIImage);
  const description = useSelector((store) => store.pizza.description);
  const AIDescription = useSelector((store) => store.pizza.AIDescription);
  const selectedToppings = useSelector((store) => store.toppings.selected);
  const availableToppings = useSelector((store) => store.toppings.available);

  useEffect(() => {
    if (
      selectedToppings.length === 0 ||
      AIName === '' ||
      AIDescription === '' ||
      AIImage === '' ||
      description === ''
    ) {
      navigate('/');
      return;
    }
  }, []);

  const handleSubmitOrder = async () => {
    const ordered = createOrder({
      email: 'jawad.php@gmail.com',
      pizzaName: AIName,
      customerDescription: description,
      aiDescription: AIDescription,
      aiImage: AIImage,
      availableToppings,
      selectedToppings,
    });

    console.log(ordered);
  };

  return (
    <>
      <Loader reason="Ordering a pizza for you..." />
      <button onClick={handleSubmitOrder}>Submit Order</button>
      {image !== null && <img src={image} />}
    </>
  );
}
