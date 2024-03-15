import Item from "@/app/Interfaces"
import { CartItemI } from "@/app/Interfaces"
import { createSlice } from "@reduxjs/toolkit";

interface CartState{
    cartItems: CartItemI[];
}

const initialState : CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem : (state,action) =>{
            state.cartItems.push(action.payload);
        },
        removeItem : (state,action) =>{
            state.cartItems.filter((item,id)=>id !== action.payload)
        }
    }
})

export const {addItem,removeItem} = cartSlice.actions;

export default cartSlice.reducer;
