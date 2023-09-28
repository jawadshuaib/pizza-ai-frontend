import { configureStore } from '@reduxjs/toolkit';
import {
  toppingsReducer,
  pizzaReducer,
  orderReducer,
  loadingReducer,
  errorReducer,
} from './slices';

const store = configureStore({
  reducer: {
    toppings: toppingsReducer,
    pizza: pizzaReducer,
    order: orderReducer,
    loading: loadingReducer,
    error: errorReducer,
  },
});

export default store;
