'use client'

import { RootState } from "@/app/State/state";
import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import CartItem from "../CartItem";
export default function CartContent() {
    const cart = useSelector((state : RootState)=> state.cart.cartItems)



    useEffect(() => {
        console.log(cart)
    }, [])
    return (
        <div>
            {cart.length !== 0 ?
                <div className="w-4/5 m-auto mt-10 flex flex-col lg:flex-row">
                    <div className="lg:w-2/3">
                        <h1 className="text-2xl">Cart</h1>
                        {cart.map((item, index) => (<CartItem key={index} index={index} item={item}/>))}
                    </div>
                    <div className="lg:w-1/3">
                        <h1 className="text-2xl">Summary</h1>
                    </div>
                </div> :
                <div className="mt-10">
                    <h1 className="text-center text-3xl">There are no items in your cart</h1>
                </div>
            }

        </div>
    )
}