'use client'

import { useDispatch} from "react-redux";
import { removeItem,updateItemColor,updateItemPrice } from "@/app/State/Cart/CartSlice";
import { useState,useEffect } from "react";
import { CartItemI } from "@/app/Interfaces"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import Quantity from "./Quantity";

export default function CartItem({index,item}:{index:number,item:CartItemI}) {

    const dispatch = useDispatch();
    const [quantity,setQuantity] = useState(item.quantity);

    useEffect(() => {
        updatePrice(quantity);
    },[quantity]);

    function deleteItemFromCart(){
        dispatch(removeItem({id:item.id,color:item.color}));
    }
    function updatePrice(newQuantity: number){
       dispatch(updateItemPrice({index:index,quantity:newQuantity}));
    }
    function updateColor(newColor: string){
        dispatch(updateItemColor({index:index,color:newColor}));
    }

    return(
        <div className="flex my-2 border-y-2  lg:p-4">
            <Link key={index} href={"/products/[itemPage][id]"} as={`/products/${item.name.replace(/\s/g, "_")}/${item.id}`} className='w-1/4 xl:w-1/5'>
                <img src={item.image[0]} className=""/>
            </Link>
            <div className="mt-2 ml-2 w-full  flex flex-col justify-evenly">
                <div className="flex  justify-between">
                    <h1 className="2xl:text-xl">{item.name}</h1>
                    <h2 className="font-bold 2xl:text-xl">${item.price}</h2>
                </div>
                <div className="flex my-2">
                    <Quantity quantity={quantity} setQuantity={setQuantity}/>
                </div>
                {item.color ? 
                <div className="flex">
                    <h2 className="font-bold">Color : </h2>
                    <select className="bg-transparent" onChange={(e)=>{updateColor(e.target.value)}}>
                        {item.colorOptions ? item.colorOptions.map((option,id)=>(
                        <option key={id} value={option} selected={option === item.color}>{option}</option>

                        )):""} 
                    </select>
                </div> : " "}
                <div>
                    <button onClick={()=>deleteItemFromCart()}><FontAwesomeIcon icon={faTrashCan} className="  hover:text-red-700 hover:transition-colors" /></button>
                </div>
            </div>
        </div>
    )
}