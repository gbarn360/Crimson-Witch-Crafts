'use client'

import { RootState } from "@/app/State/state";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
export default function CartContent() {
    const cart = useSelector((state : RootState)=> state.cart.cartItems)

    function getTotalPrice(){

        let totalPrice = cart.reduce((price,item)=>{return price + item.price},0);
        
        return totalPrice;
    }

    return (
        <div>
            {cart.length !== 0 ?
                <div className="w-4/5 m-auto mt-10 flex flex-col items-center">
                    <div className="w-1/2">
                        <h1 className="text-2xl">Cart</h1>
                        {cart.map((item, index) => (<CartItem key={index} index={index} item={item}/>))}
                    </div>
                    <div className="relative   w-1/2 flex justify-center">
                        <button className="p-2 border-2 text-xl hover:bg-customRed hover:transition-colors hover:text-white hover:border-customRed">Checkout</button>
                        <h2 className="absolute right-0 top-0 text-lg">Total: <span className="font-bold">${getTotalPrice()}</span></h2>
                    </div>
                </div> :
                <div className="mt-10">
                    <h1 className="text-center text-3xl">Your cart is empty!</h1>
                </div>
            }

        </div>
    )
}