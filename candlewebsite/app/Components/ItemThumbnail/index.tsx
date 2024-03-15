'use client'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/State/state";
import { addItem } from "@/app/State/Cart/CartSlice";


export default function itemThumbnail({ id,name, image, price }: {id:number, name: string, image: string[], price: number }) {
    const cart = useSelector((state : RootState)=> state.cart.cartItems)
    const dispatch = useDispatch();

    function addItemToCart(e:React.MouseEvent<HTMLButtonElement>){
        dispatch(addItem({id,name,image,price,quantity: 1}));
        console.log(cart);
        e.preventDefault();

    }

    return (
        <div className=' hover:transition hover:-translate-y-1 hover:cursor-pointer rounded-3xl '>
            <img src={image[0]} alt={name} className="m-auto rounded-sm shadow-md" />
            <div className="mt-5 text-md md:text-lg">
                <h1 className=" text-gray-900 text-sm xl:text-lg">{name}</h1>
                <h2 className=" mb-2 text-gray-900">${price}</h2>
                <button onClick={(e)=>addItemToCart(e)} className="bg-gray-900 text-gray-50 w-full p-2 rounded-sm hover:transition-colors hover:bg-customRed">ADD TO BAG</button>
            </div>
        </div>
    )
}