import { createSlice } from "@reduxjs/toolkit";
import { CartState } from "@/app/Interfaces";


export const loadCartState = (): CartState => {
    let initialState: CartState;

    if (typeof window !== 'undefined' && localStorage !== undefined) {
        const storedState = localStorage.getItem("cartState");
        if (storedState) {
            const { cart, expires } = JSON.parse(storedState);
            const expirationDate = new Date(expires);
            if (expirationDate.getTime() > Date.now()) {
                initialState = cart;
            } else {
                initialState = { cartItems: [] };
                localStorage.removeItem("cartState");
            }
        } else {
            initialState = { cartItems: [] };
        }
    } else {
        initialState = { cartItems: [] };
    }

    return initialState;
};

export const saveCartState = (state: CartState): void => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 2); // Set expiration 2 days from now
        localStorage.setItem("cartState", JSON.stringify({ cart: state, expires: expirationDate.getTime() }));
    }
};


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

        },
        
        clearCart : (state) =>{
            state.cartItems = [];
            saveCartState(state);
        }
    }
})

export const {addItem,removeItem,updateItemPrice,updateItemColor,clearCart} = cartSlice.actions;

export default cartSlice.reducer;
