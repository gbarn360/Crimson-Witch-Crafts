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

            
            let matched = false;
            state.cartItems.map((item) =>
            { 
                let currentItem = {
                    id: item.id,
                    color: item.color
                }
                let newItem = {
                    id: action.payload.id,
                    color: action.payload.color
                }

                if(JSON.stringify(currentItem) === JSON.stringify(newItem)){
                    item.quantity += action.payload.quantity; 
                    item.price *= item.quantity;
                    matched = true;
                    return;
                }
            })
       
            if(matched === false) state.cartItems.push(action.payload); //no match found
        },
        removeItem: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => {
                return !(item.id === action.payload.id && item.color === action.payload.color);
            });
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
