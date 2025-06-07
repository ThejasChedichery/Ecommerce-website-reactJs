
import { configureStore } from "@reduxjs/toolkit";
import allProductSlice from "./AllProductSlice"
import CardDataSlice from "./CardDataSlice"
import CartSlice from "./CartSlice"


const Store = configureStore({

    reducer:{

        allProducts: allProductSlice,
        cardData:CardDataSlice,
        Cart : CartSlice
    }

})

export default Store;

