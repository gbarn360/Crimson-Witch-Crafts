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
        addItem: (state, action) => {

            let matchedItemIndex ;
           if(action.payload.color){
                matchedItemIndex = state.cartItems.findIndex(item => 
                    item.id === action.payload.id && item.color === action.payload.color
                );
           }
           else{
                matchedItemIndex = state.cartItems.findIndex(item => 
                    item.id === action.payload.id
                );
           }
        
            if (matchedItemIndex !== -1) {
                // Item already exists in the cart
                state.cartItems[matchedItemIndex].price += action.payload.price;
                state.cartItems[matchedItemIndex].quantity += action.payload.quantity;
            } else {
                // Item doesn't exist in the cart
                state.cartItems.push(action.payload);
            }
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
