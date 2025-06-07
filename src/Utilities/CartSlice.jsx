
import { createSlice } from "@reduxjs/toolkit";


const CartSlice = createSlice({
    name: "Cart",
    initialState: {
        cartItems: [],
        cartNoS: 0,
        Subtotal: 0
    },
    reducers: {

        addCartData: (state, action) => {

            state.cartItems = action.payload
            state.cartNoS = state.cartItems.length

            state.Subtotal = 0;
            state.cartItems.forEach(item => {

            state.Subtotal += (item.price * item.quantity)
            })
        },

    }
})

export const { addCartData, removeCart } = CartSlice.actions;
export default CartSlice.reducer