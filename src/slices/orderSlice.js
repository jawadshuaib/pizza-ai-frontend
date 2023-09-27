// Once the order has been submitted, all its details are stored in this slice
import { createSlice } from '@reduxjs/toolkit';
import { fetchAndUploadImage } from '../services/supabase/upload';
import Insert from '../services/supabase/insert';
import { setLoading } from './loadingSlice';
import { setError } from './errorSlice';

const initialState = {
  customer: [],
  upload: [],
  order: [],
  orderToppings: [],
  headerImage: '',
  completed: false,
};

const orderReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setCustomer(state, action) {
      state.customer = action.payload;
    },
    setOrder(state, action) {
      state.order = action.payload;
    },
    setUpload(state, action) {
      state.upload = action.payload;
    },
    setOrderToppings(state, action) {
      state.orderToppings = action.payload;
    },
    setCompleted(state, action) {
      state.completed = action.payload;
    },
    setHeaderImage(state, action) {
      state.headerImage = action.payload;
    },
    reset(state) {
      state.customer = [];
      state.upload = [];
      state.order = [];
      state.orderToppings = [];
      state.headerImage = '';
      state.completed = false;
    },
  },
});

export default orderReducer.reducer;

export const {
  setCustomer,
  setOrder,
  setUpload,
  setOrderToppings,
  setCompleted,
  setHeaderImage,
  reset,
} = orderReducer.actions;

export function createOrder({
  email,
  pizzaName,
  customerDescription,
  aiDescription,
  aiImage,
  availableToppings,
  selectedToppings,
}) {
  // Get suggested toppings from openai
  return async function (dispatch) {
    try {
      dispatch(setLoading([true, 'Submitting order...📦']));
      // Create customer
      const customer = await insertCustomer({ email });
      const customerId = customer[0]['customer_id'];

      dispatch(setLoading([true, 'Uploading pizza image...🍕']));
      // Upload image
      // Download image from openai and then upload it to supabase storage
      const upload = await uploadImage({ aiImage });
      const imageUrl = upload.path;

      dispatch(setLoading([true, 'Adding toppings...🌽🥕🍅']));

      // Create order
      const order = await insertOrder({
        customerId,
        pizzaName,
        imageUrl,
        customerDescription,
        aiDescription,
      });
      const orderId = order[0]['order_id'];

      // Add toppings selected
      const orderToppings = await insertToppings({
        orderId,
        availableToppings,
        selectedToppings,
      });

      if (
        customer.length > 0 &&
        upload.path.length > 0 &&
        order.length > 0 &&
        orderToppings.length > 0
      ) {
        dispatch(setCustomer(customer));
        dispatch(setUpload(upload));
        dispatch(setOrder(order));
        dispatch(setOrderToppings(orderToppings));
        // Mark order as completed
        dispatch(setCompleted(true));
      }

      dispatch(setLoading([false, '']));
    } catch (error) {
      dispatch(
        setError([
          true,
          'There was an error submitting your order. Please try again.',
        ]),
      );
    }
  };
}

async function insertCustomer({ email }) {
  return await Insert.customer({
    email,
  });
}

async function uploadImage({ aiImage }) {
  return await fetchAndUploadImage(aiImage);
}

async function insertOrder({
  customerId,
  pizzaName,
  imageUrl,
  customerDescription,
  aiDescription,
}) {
  return await Insert.order({
    customerId,
    pizzaName,
    imageUrl,
    customerDescription,
    aiDescription,
  });
}

async function insertToppings({
  orderId,
  availableToppings,
  selectedToppings,
}) {
  // Get topping ids selected
  const toppingIds = availableToppings
    .filter((row) => selectedToppings.includes(row.topping))
    .map((row) => row.topping_id);

  // Add toppings selected
  return await Insert.orderToppings({
    orderId,
    toppingIds,
  });
}
