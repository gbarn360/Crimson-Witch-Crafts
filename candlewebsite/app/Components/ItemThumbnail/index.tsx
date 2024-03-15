'use client'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/State/state";
import { addItem } from "@/app/State/Cart/CartSlice";
import Item from "@/app/Interfaces";


export default function itemThumbnail({ item }: { item: Item }) {
    const cart = useSelector((state : RootState)=> state.cart.cartItems)
    const dispatch = useDispatch();

    function addItemToCart(e:React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        
        item.colorOptions ? dispatch(addItem({id:item.id,name:item.name,image:item.image,price:item.price,color:item.colorOptions[0],quantity: 1}))
        /*item doesn't have color option*/ :  dispatch(addItem({id:item.id,name:item.name,image:item.image,price:item.price,quantity: 1}))

    }

    return (
        <div className=' hover:transition hover:-translate-y-1 hover:cursor-pointer rounded-3xl '>
            <img src={item.image[0]} alt={item.name} className="m-auto rounded-sm shadow-md" />
            <div className="mt-5 text-md md:text-lg">
                <h1 className=" text-gray-900 text-sm xl:text-lg">{item.name}</h1>
                <h2 className=" mb-2 text-gray-900">${item.price}</h2>
                <button onClick={(e)=>addItemToCart(e)} className="bg-gray-900 text-gray-50 w-full p-2 rounded-sm hover:transition-colors hover:bg-customRed">ADD TO BAG</button>
            </div>
        </div>
    )
}