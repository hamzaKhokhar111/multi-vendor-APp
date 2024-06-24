import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { server } from '../server';
import store from './redux/store';
import { loadUser } from './redux/actions/user';
import HomePage from './pages/HomePage';
import BestDeals from './components/Route/BestDeals/BestDeals';
import ProductCard from './components/Route/ProductCard/ProductCard';
import FAQPage from './pages/FAQPage/FAQPage';
import Events from './components/Events/Events';
import ProductDetailsPage from './pages/ProductDetailsPage';
import { Login, SignupPage } from '../Routes';
import ProfilePage from './pages/ProfilePage';
import ShopCreatePage from './pages/ShopCreate';
import ShopLoginPage from './pages/ShopLoginPage';
import ShopDashboardPage from './pages/ShopDashboardPage';
import ShopHomePage from './pages/ShopHomePage';
import ShopCreateProduct from './components/ShopCreateProduct';
import AllProducts from './components/shop/AllProducts';
import CreateEvent from './components/shop/CreateEvent';
import ShopAllEvents from './pages/ShopAllEvents';
import ShopAllCoupouns from './pages/ShopAllCoupouns';
import Checkout from './components/Checkout/Checkout';
import Payment from './components/Payment/Payment';
import { Elements } from '@stripe/react-stripe-js';
import ShopAllOrders from './ShopAllOrders';
import ShopAllRefunds from './pages/ShopAllRefunds';
import ShopSettingsPage from './pages/ShopSettingsPage';
import ShopWithDrawMoneyPage from './pages/ShopWithDrawMoneyPage';
import ShopInboxPage from './pages/ShopInboxPage';
import UserInbox from './pages/UserInbox';


function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/best-selling' element={<BestDeals />} />
          <Route path='/products' element={<ProductCard />} />
          <Route path='/faq' element={<FAQPage />} />
          <Route path='/events' element={<Events />} />
          <Route path='/product/:name' element={<ProductDetailsPage />} />
          <Route path='/profile' element={<ProfilePage/>} />
          <Route path='shope-create' element={<ShopCreatePage/>} />
          <Route path='shop-login' element={<ShopLoginPage/>} />
          <Route  path='dashboard' element={<ShopDashboardPage/>} />
          <Route  path='shop' element={<ShopHomePage/>} />
           <Route  path='dashboard-create-product' element={<ShopCreateProduct/>} />
           <Route  path='dashboard-products' element={<AllProducts/>} />
           <Route  path='/dashboard-create-event' element={<CreateEvent/>} />
           <Route path='/dashboard-events' element={<ShopAllEvents/>}  />
           <Route path='/dashboard-coupouns' element={<ShopAllCoupouns/>}  />
           <Route path='/checkout' element={<Checkout/>}  />
           <Route path='/Payment' element={<Payment/>}  />
          
           <Route path='/dashboard-orders' element={<ShopAllOrders/>}  />
           <Route path='/dashboard-refunds' element={<ShopAllRefunds/>} />
           <Route path='/settings' element={<ShopSettingsPage/>} /> 
           <Route path='/dashboard-withdraw-money' element={<ShopWithDrawMoneyPage/>}/>
           <Route path='/dashboard-messages' element={<ShopInboxPage/>} />
           <Route path='/inbox' element={<UserInbox/>} />
           



        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
