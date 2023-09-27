// Put also state slice selectors here to keep the component code clean
import { useSelector } from 'react-redux';

export const useAppSelectors = () => {
  const availableToppings = useSelector((store) => store.toppings.available);
  const suggestedToppings = useSelector((store) => store.toppings.suggested);
  const selectedToppings = useSelector((store) => store.toppings.selected);
  const AIName = useSelector((store) => store.pizza.AIName);
  const AIImage = useSelector((store) => store.pizza.AIImage);
  const isLoading = useSelector((store) => store.loading.isLoading);
  const loadingReason = useSelector((store) => store.loading.reason);
  const description = useSelector((store) => store.pizza.description);
  const orderCompleted = useSelector((store) => store.order.completed);
  const order = useSelector((store) => store.order.order);
  const customer = useSelector((store) => store.order.customer);
  const AIDescription = useSelector((store) => store.pizza.AIDescription);
  // Listen to errors relating to API loading
  const apiError = useSelector((store) => store.error.isError);
  const reason = useSelector((store) => store.error.reason);
  const generatedImage = useSelector((store) => store.order.headerImage);

  return {
    AIName,
    AIImage,
    isLoading,
    loadingReason,
    description,
    orderCompleted,
    order,
    customer,
    AIDescription,
    selectedToppings,
    suggestedToppings,
    availableToppings,
    apiError,
    reason,
    generatedImage,
  };
};
