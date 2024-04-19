'use client'


import { useEffect } from "react"
import { clearCart } from "../State/Cart/CartSlice"
import { useDispatch } from "react-redux"

export default function OrderSuccessDetails(){

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearCart())
    },[])
    return(
        <h1 className="m-auto mt-20 h-2/3 font-bold text-3xl">Your order was placed!</h1>
    )
}