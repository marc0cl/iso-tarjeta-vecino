import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import Benefits from './routes/benefits/Benefits.jsx';
import CreateBenefit from './routes/benefits/CreateBenefit.jsx';
import DetailsBenefit from './routes/benefits/DetailsBenefit.jsx';
import UpdateBenefit from './routes/benefits/UpdateBenefit.jsx';


import Forms from './routes/forms/Forms.jsx';
import DetailsForm from './routes/forms/DetailsForm.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/beneficios',
        element: <Benefits />,
      },
      {
        path: '/beneficios/:id',
        element: <DetailsBenefit />,
      },
      {
        path: '/beneficios/crear',
        element: <CreateBenefit />,
      },
      {
        path: '/beneficios/editar/:id',
        element: <UpdateBenefit />,
      },
      {
        path: '/forms',
        element: <Forms />,
      },
      {
        path: '/forms/:id',
        element: <DetailsForm />,
      }
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
