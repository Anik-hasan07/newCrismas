/* eslint-disable no-unused-vars */
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { ToastContainer } from "react-toastify";


const router = createBrowserRouter([
  {
    path: '/',
    element: (

        <Home></Home>
  
    ),
  },
  {
    path: '/product-detail/:id',
    element: (
      
        <ProductDetailPage></ProductDetailPage>
     
    ),
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
  {
    path: '/signup',
    element: <SignupPage></SignupPage>,
  },

]);

export default function App() {
  return (
    <>
    <div className="App">
    <ToastContainer position="top-right" autoClose={500} />
    <RouterProvider router={router} />
    </div>
    </>
  )
}