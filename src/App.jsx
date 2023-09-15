import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import Describe, {
  loader as describeLoaders,
} from './features/create/Describe';
import Toppings from './features/create/Toppings';
import Preview from './features/create/Preview';
import Order from './features/order/Order';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';
import store from './store';

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        {
          path: '/',
          element: <Describe />,
          loader: describeLoaders,
          errorElement: <Error />,
        },
        {
          path: '/create-pizza/toppings',
          element: <Toppings />,
        },
        { path: '/create-pizza/preview', element: <Preview /> },
        { path: '/order-pizza', element: <Order /> },
      ],
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
