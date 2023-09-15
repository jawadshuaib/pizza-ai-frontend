import { configureStore } from '@reduxjs/toolkit';

import toppingsReducer from './slices/toppingsSlice';
import pizzaReducer from './slices/pizzaSlice';
import loadingReducer from './slices/loadingSlice';

const store = configureStore({
  reducer: {
    toppings: toppingsReducer,
    pizza: pizzaReducer,
    loading: loadingReducer,
  },
});

export default store;
