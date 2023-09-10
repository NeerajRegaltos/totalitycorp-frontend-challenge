import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../redux/reducer/productReducer";
import cartSlice from "../redux/reducer/cartReducer";
import userSlice from "../redux/reducer/userReducer";

const store = configureStore({
    reducer: {
        products: productSlice,
        cart: cartSlice,
        user: userSlice
    }
})

export default store;