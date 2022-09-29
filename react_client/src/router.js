import { Navigate } from 'react-router-dom';
import AddProduct from './screens/AddProduct'
import EditProduct from './screens/EditProduct'
import ProductDetail from './screens/ProductDetail'
import ShowProducts from './screens/ShowProducts'
import Loginpage from './screens/loginpage'
import Singup from './screens/Singup'


export const routes = [
    {
      path: '/home',
      element: <Navigate to="home"/>
    },
    {
      path:'/',
      children:[
        {
        path: '/',
       element:<Loginpage />,
      },
      {
        path: '/signup',
       element:<Singup />,
      }
    ],
    },

   
    {
      path: 'products',
    //   element: <Layout />,
      children: [
        {
          path: '/products',
          element: <ShowProducts />
        },
        {
          path: '/products/addProduct',
          element: <AddProduct />
        },
        {
          path: '/products/edit/:id',
          element: <EditProduct />
        },
        {
          path: '/products/:id',
          element: <ProductDetail />
        },
        {
          path: '/dashboard/icons',
        //   element: <Login />
        },
        {
          path: '*',
        //   element: <Navigate to="/404" />
        }
      ]
    },
    {
      path: '404',
    //   element: <Pages404 />
    }
  ];