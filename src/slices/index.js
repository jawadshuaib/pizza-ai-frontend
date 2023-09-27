export { default as errorReducer, setError } from './errorSlice';
export { default as loadingReducer, setLoading } from './loadingSlice';

// Order slice
export {
  default as orderReducer,
  createOrder,
  setCustomer,
  setOrder,
  setUpload,
  setOrderToppings,
  setCompleted,
  setHeaderImage,
  reset as resetOrder,
} from './orderSlice';

// Pizza slice
export {
  default as pizzaReducer,
  setAIImage,
  setAISuggestions,
  saveDescription,
  reset as resetPizza,
} from './pizzaSlice';

// Toppings slice
export {
  default as toppingsReducer,
  updateSelectedToppings,
  setShowAllToppings,
  setAvailableToppings,
  setSuggestedToppings,
  reset as resetToppings,
} from './toppingsSlice';
