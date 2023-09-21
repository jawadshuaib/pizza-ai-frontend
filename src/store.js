import { configureStore } from '@reduxjs/toolkit';

import toppingsReducer from './slices/toppingsSlice';
import pizzaReducer from './slices/pizzaSlice';
import loadingReducer from './slices/loadingSlice';
import errorReducer from './slices/errorSlice';

const store = configureStore({
  reducer: {
    toppings: toppingsReducer,
    pizza: pizzaReducer,
    loading: loadingReducer,
    error: errorReducer,
  },
});

export default store;
