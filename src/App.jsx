import { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Mainlayout from './layout/Main';

import Homepage from './homepage/Homepage';

import Loginpage from './auth/Login';
import Registerpage from './auth/Register';

import Productspage from './products/Products';
import ProductDetailspage from './products/ProductDetails';

import Transactionpage from './transaction/Transaction';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Mainlayout/>}>
          <Route index element={<Homepage />} />
          <Route path="register" element={<Registerpage/>} />
          <Route path="login" element={<Loginpage/>} />
          <Route path="products">
            <Route index element={<Productspage/>} />
            <Route path=":productid" element={<ProductDetailspage/>} />
          </Route>
          <Route path="transaction" element={<Transactionpage/>} />
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
