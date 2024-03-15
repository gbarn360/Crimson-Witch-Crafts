'use client'

import { CartItemI } from "@/app/Interfaces"


export default function CartItem({item}:{item:CartItemI}) {

    return(
        <div className="flex my-2 border-y-2 p-4">
            <img src={item.image[0]} className="w-1/6"/>
            <div className="mt-2 ml-2 w-full">
                <div className="flex  justify-between">
                    <h1 className="">{item.name}</h1>
                    <h2 className="font-bold">${item.price}</h2>
                </div>
                <div className="flex">
                    <h2 className="font-bold">Quantity : </h2>
                    <select className="bg-transparent">
                        <option value={item.quantity}>{item.quantity}</option>
                        <option value={item.quantity}>2</option>
                        <option value={item.quantity}>3</option>
                    </select>
                </div>
                {item.color ? 
                <div className="flex">
                    <h2 className="font-bold">Color : </h2>
                    <select className="bg-transparent">
                        <option value={item.color}>{item.color}</option>
                        <option value={item.quantity}>2</option>
                        <option value={item.quantity}>3</option>
                    </select>
                </div> : " "}
            </div>
        </div>
    )
}