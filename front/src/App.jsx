import React from 'react' 
import {BrowserRouter,Route,Routes,Router} from 'react-router-dom'
import { Login, SignupPage } from '../Routes.js'

function App() {
  return (
    <>
   {/* <SignupPage/> */}
     <BrowserRouter>
     <Routes>
     <Route path='/signin'  element={<Login/>} />
     <Route path='/signup'  element={<SignupPage/>} />

     </Routes>
     </BrowserRouter> 
  
    </>
  )
}

export default App
