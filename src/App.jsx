import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Describe from './features/create/Describe';
import Toppings from './features/create/Toppings';
import Size from './features/create/Size';
import Order from './features/order/Order';
import AppLayout from './ui/AppLayout';
import Home from './ui/Home';
import Error from './ui/Error';

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        { path: '/', element: <Home /> },

        {
          path: '/create-pizza/describe',
          element: <Describe />,
          errorElement: <Error />,
        },
        { path: '/create-pizza/toppings', element: <Toppings /> },
        { path: '/create-pizza/size', element: <Size /> },
        { path: '/order-pizza', element: <Order /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
