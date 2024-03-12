'use client'

import Item from "@/app/Interfaces";
import { useState, useEffect } from "react"

export default function CartContent() {

    const [cartItems, setCartItems] = useState<Item[]>([]);

    useEffect(() => {
    }, [])
    return (
        <div>
            {cartItems ?
                <div className="w-4/5 m-auto mt-10 flex">
                    <div className="w-1/2">
                        <h1 className="text-2xl">Cart</h1>
                        {cartItems.map((item, index) => (<div>{item.name}</div>))}
                    </div>
                    <div className="w-1/2">
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