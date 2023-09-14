import { configureStore } from '@reduxjs/toolkit';

import toppingsReducer from './slices/toppingsSlice';
import pizzaReducer from './slices/pizzaSlice';

const store = configureStore({
  reducer: {
    toppings: toppingsReducer,
    pizza: pizzaReducer,
  },
});

export default store;
