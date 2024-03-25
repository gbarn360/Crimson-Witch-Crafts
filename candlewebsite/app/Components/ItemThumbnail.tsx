'user client'

import { useDispatch } from "react-redux";
import { addItem } from "@/app/State/Cart/CartSlice";
import Item from "@/app/Interfaces";
import { useState } from "react"


export default function ItemThumbnail({ item }: { item: Item }) {
    const dispatch = useDispatch();
    const [displayMessage, setDisplayMessage] = useState(false);



    function addItemToCart(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        setDisplayMessage(true);
        setTimeout(() => { setDisplayMessage(false) }, 3000);

        item.colorOptions ? dispatch(addItem({ id: item.id, name: item.name, image: item.image, itemPrice: item.price, totalPrice: item.price, color: item.colorOptions[0], colorOptions: item.colorOptions, quantity: 1 }))
            : dispatch(addItem({ id: item.id, name: item.name, image: item.image, itemPrice: item.price, totalPrice: item.price, quantity: 1 }));

    }

    return (
        <div className=' hover:cursor-pointer rounded-3xl relative'>
            {displayMessage ? <h1 className="fixed top-0 left-0 bg-customRed w-full text-center p-2 text-white ">Item added to bag!</h1> : null}
            <img src={item.image[0]} alt={item.name} className="m-auto rounded-sm shadow-md" />
            <div className="mt-5 text-md md:text-lg">
                <h1 className="text-gray-900 text-sm xl:text-lg">{item.name}</h1>
                <h2 className="mb-2 text-gray-900">${item.price.toFixed(2)}</h2>
                <button onClick={(e) => addItemToCart(e)} className="bg-gray-900 text-gray-50 w-full p-2 rounded-sm hover:transition-colors hover:bg-customRed">ADD TO BAG</button>
            </div>
        </div>
    );
}
