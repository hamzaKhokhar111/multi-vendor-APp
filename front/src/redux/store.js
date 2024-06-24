import {configureStore} from '@reduxjs/toolkit'
import { userReducer } from './reducer/user';
import cartReducer from './reducer/cart';
import wishlistReducer from "./reducer/wishlist";


// import { wishlistReducer } from './reducer/wishlist';
// import { cartReducer } from './reducer/cart';


const store=configureStore({
reducer:{
    user: userReducer,
    cart: cartReducer,
    wishlist: wishlistReducer

}
});

export default store;