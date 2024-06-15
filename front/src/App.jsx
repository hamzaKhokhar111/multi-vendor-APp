import React, { useEffect } from 'react' 
import {BrowserRouter,Route,Routes,Router} from 'react-router-dom'
import { Login, SignupPage } from '../Routes.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { server } from '../server.js';
import store from './redux/store.js';
import {loadUser} from './redux/actions/user.js'
import HomePage from './pages/HomePage.jsx';
import BestDeals from './components/Route/BestDeals/BestDeals.jsx';
import ProductCard from './components/Route/ProductCard/ProductCard.jsx';
import FAQPage from './pages/FAQPage/FAQPage.jsx';
import Events from './components/Events/Events.jsx';


function App() {
 useEffect(()=>{
  store.dispatch(loadUser())
 })
  return (
    <>
   {/* <SignupPage/> */}
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<HomePage/>} />
     <Route path='/signin'  element={<Login/>} />
     <Route path='/signup'  element={<SignupPage/>} />
     <Route path='/best-selling' element={<BestDeals/>} />
     <Route path='/products'  element={<ProductCard/>} />
     <Route path='/faq' element={<FAQPage/>} />
     <Route path='/events' element={<Events/>} />
     

     </Routes>
     </BrowserRouter> 
  
    </>
  )
}

export default App
