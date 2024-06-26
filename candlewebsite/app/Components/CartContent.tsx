'use client'

import { RootState } from "@/app/State/state";
import { useSelector } from "react-redux";
import Loading from "./Loading"
import { checkoutUser } from "../services"
import CartItem from "./CartItem";
import { useState } from "react";
export default function CartContent() {
    const [loading,setLoading] = useState(false);
    const cart = useSelector((state : RootState)=> state.cart.cartItems)

    function getTotalPrice(){

        let totalPrice = cart.reduce((price,item)=>{return price + item.totalPrice},0);
        
        return totalPrice.toFixed(2);
    }

    return (

            <div className="flex flex-col min-h-screen justify-between ">
                {loading === false ?
            <div>
                <h1 className="bg-green-300 w-full h-10 text-center fixed bottom-0">Currently in development</h1>
                    {cart.length !== 0 ?
                        <div className="sm:w-4/5 h-2/3 m-auto md:m-auto mt-10 flex flex-col items-center">
                            <div className="">
                                <h1 className="text-2xl">Cart</h1>
                                {cart.map((item, index) => (<CartItem key={index} index={index} item={item}/>))}
                            </div>
                            <div className="relative w-1/2 sm:w-full flex flex-col sm:flex-row ">
                                <button onClick={()=>{setLoading(true);checkoutUser(cart)}} className="mb-4 p-2 border-2 text-xl hover:bg-customRed hover:transition-colors hover:text-white hover:border-customRed">Checkout</button>
                                <h2 className="text-center sm:absolute right-0 top-0 text-lg">Total: <span className="font-bold">${getTotalPrice()}</span></h2>
                            </div>
                        </div> :
                        <div className="mt-40">
                            <h1 className="text-center text-3xl">Your cart is empty!</h1>
                        </div>
                    }
            </div>
                : <Loading />}
            </div>

    )
}