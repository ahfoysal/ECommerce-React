import React, { useEffect } from 'react'
import{ Route, Routes, useLocation } from 'react-router-dom';
import Home from "./home/Home";
import { useContextS } from './cart/Function';
import SingleProductPage from './SingleproductPage/SingleProductPage';
import Profile from "./login/profile";
import Cart from './cart/Cart';
import SIngleOrder from './Orders';
import Checkout from './checkout/Checkout';
import Login from './login/login';
import OrdersList from './OrdersPage/OrderList';
import Signup from './login/signup';
// import Category from "./Category";
// import Searched from "./Searched";
// import Product from "./SingleproductPage/Product";

// import Checkout from './checkout/Checkout';

// import Shop from '../components/Shop';

// import PaymentSuccess from './app-backend/Payment-success';


function Pages() {
  const location = useLocation();
       let { getCart} =  useContextS();

  useEffect(() => {
    getCart();

    }, [])

  return (
    
        <Routes location={location} key={location.pathname}>
       <Route path="/" element={<Home />}/>
     
       {/* <Route path="/searched/:search" element={<Searched />} /> */}
       <Route path="/product/:name" element={<SingleProductPage />} />
       <Route path="/order/:name" element={<SIngleOrder />} />
       <Route path="/cart" element={<Cart  />} />
       <Route path="/checkout" element={<Checkout />} />
       <Route path="/login/" element={<Login   />} />
       <Route path="/signup/" element={<Signup />} />
       <Route path="/orders/" element={  <OrdersList /> }/>
       <Route path="/profile/" element={  <Profile /> }/>
       {/* <Route path="/Success/:id" element={<PaymentSuccess />} /> */}

       </Routes>  
    
  );
};

export default Pages