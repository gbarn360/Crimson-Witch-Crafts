'use client'

import { useDispatch} from "react-redux";
import { removeItem,updateItemColor,updateItemPrice } from "@/app/State/Cart/CartSlice";
import { CartItemI } from "@/app/Interfaces"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function CartItem({index,item}:{index:number,item:CartItemI}) {

    const dispatch = useDispatch();


    function deleteItemFromCart(){
        dispatch(removeItem(item.id));
    }
    function updatePrice(newQuantity: number){
       dispatch(updateItemPrice({index:index,quantity:newQuantity}));
    }
    function updateColor(newColor: string){
        dispatch(updateItemColor({index:index,color:newColor}));
    }

    return(
        <div className="flex my-2 border-y-2  lg:p-4">
            <img src={item.image[0]} className="w-1/2 lg:w-1/6"/>
            <div className="mt-2 ml-2 w-full">
                <div className="flex  justify-between">
                    <h1 className="">{item.name}</h1>
                    <h2 className="font-bold">${item.price}</h2>
                </div>
                <div className="flex">
                    <h2 className="font-bold">Quantity : </h2>
                    <select className="bg-transparent" onChange={(e)=>{updatePrice(Number(e.target.value))}}>
                        <option value={item.quantity}>{item.quantity}</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </select>
                </div>
                {item.color ? 
                <div className="flex">
                    <h2 className="font-bold">Color : </h2>
                    <select className="bg-transparent" onChange={(e)=>{updateColor(e.target.value)}}>
                        <option value={item.color}>{item.color}</option>
                        <option value={"red"}>red</option>
                        <option value={"black"}>black</option>
                    </select>
                </div> : " "}
                <button onClick={()=>deleteItemFromCart()}><FontAwesomeIcon icon={faTrashCan} className="hover:text-red-700 hover:transition-colors" /></button>
            </div>
        </div>
    )
}