'use client'

import { RootState } from "@/app/State/state";
import { useSelector } from "react-redux";
import { checkoutUser } from "../services";
import CartItem from "./CartItem";
import Footer from "./Footer";
export default function CartContent() {
    const cart = useSelector((state : RootState)=> state.cart.cartItems)

    function getTotalPrice(){

        let totalPrice = cart.reduce((price,item)=>{return price + item.totalPrice},0);
        
        return totalPrice.toFixed(2);
    }

    return (
        <div>
            {cart.length !== 0 ?
                <div className="m-10 sm:w-4/5  md:m-auto mt-10 flex flex-col items-center">
                    <div className="">
                        <h1 className="text-2xl">Cart</h1>
                        {cart.map((item, index) => (<CartItem key={index} index={index} item={item}/>))}
                    </div>
                    <div className="relative  w-4/5 flex ">
                        <button onClick={()=>checkoutUser(cart)} className="p-2 border-2 text-xl hover:bg-customRed hover:transition-colors hover:text-white hover:border-customRed">Checkout</button>
                        <h2 className="absolute right-0 top-0 text-lg">Total: <span className="font-bold">${getTotalPrice()}</span></h2>
                    </div>
                </div> :
                <div className="mt-10">
                    <h1 className="text-center text-3xl">Your cart is empty!</h1>
                </div>
            }
        <Footer />
        </div>
    )
}