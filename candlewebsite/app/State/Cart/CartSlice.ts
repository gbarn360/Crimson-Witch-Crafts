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
            state.cartItems = state.cartItems.filter((item,id)=>item.id !== action.payload)
        },
        updateItemPrice : (state,action) =>{
            const {index,quantity} = action.payload;
                 state.cartItems[index].price = state.cartItems[index].price * quantity / state.cartItems[index].quantity;
                 state.cartItems[index].quantity = quantity;
        },
        updateItemColor : (state,action) =>{
            const {index,color} = action.payload;
                 state.cartItems[index].color = color;
        }
    }
})

export const {addItem,removeItem,updateItemPrice,updateItemColor} = cartSlice.actions;

export default cartSlice.reducer;
