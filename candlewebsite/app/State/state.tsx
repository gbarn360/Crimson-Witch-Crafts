import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Cart/CartSlice"

export const store = configureStore({
    reducer: {
        cart: counterReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;