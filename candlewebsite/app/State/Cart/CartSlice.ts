import { CartItemI } from "@/app/Interfaces"
import { createSlice } from "@reduxjs/toolkit";
import { CartState } from "@/app/Interfaces";


function loadCartState() : CartState{

   
    const storedState = localStorage.getItem("cartState");
    if(storedState){
        return JSON.parse(storedState);
    }
    else{
        return{
            cartItems : []
        }
    }
}

function saveCartState(state:CartState) : void{

    localStorage.setItem("cartState", JSON.stringify(state));

}

const initialState : CartState = loadCartState();


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
                state.cartItems[matchedItemIndex].totalPrice += action.payload.totalPrice;
                state.cartItems[matchedItemIndex].quantity += action.payload.quantity;
            } else {
                // Item doesn't exist in the cart
                state.cartItems.push(action.payload);
            }
            saveCartState(state);
        },
    
        removeItem: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => {
                return !(item.id === action.payload.id && item.color === action.payload.color);
            });
            saveCartState(state);

        },
        
        updateItemPrice : (state,action) =>{
            const {index,quantity} = action.payload;
                 state.cartItems[index].totalPrice = state.cartItems[index].totalPrice * quantity / state.cartItems[index].quantity;
                 state.cartItems[index].quantity = quantity;
                 saveCartState(state);

        },
        updateItemColor : (state,action) =>{
            const {index,color} = action.payload;
                 state.cartItems[index].color = color;
                 saveCartState(state);

        }
    }
})

export const {addItem,removeItem,updateItemPrice,updateItemColor} = cartSlice.actions;

export default cartSlice.reducer;
