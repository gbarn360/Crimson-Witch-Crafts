"use client"
import Item from "@/app/Interfaces"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { addItem } from "@/app/State/Cart/CartSlice";
import Quantity from "./Quantity";



export default function ItemContent({ item }: { item: Item}) {

    const dispatch = useDispatch();
    const [image, setImage] = useState(item.image[0]);
    const [color, setColor] = useState(item.colorOptions ? item.colorOptions[0] : null);
    const [quantity, setQuantity] = useState(1);
    const [displayMessage, setDisplayMessage] = useState(false);

    function addItemToCart() {
        dispatch(addItem({ id: item.id, name: item.name, image: item.image,itemPrice:item.price, totalPrice: item.price * quantity, color: color, colorOptions: item.colorOptions, quantity: quantity }));

        setDisplayMessage(true);
        setTimeout(() => { setDisplayMessage(false) }, 3000);

    }





    function updateImage(direction: string) {

        let index = item.image.indexOf(image);

        if (direction === "left") {
            if (index === 0) setImage(item.image[item.image.length - 1])
            else setImage(item.image[index - 1])
        }
        else {
            if (index === item.image.length - 1) setImage(item.image[0])
            else setImage(item.image[index + 1])
        }

    }

    return (
        <div className="my-10 mb-96 mx-auto pt-5 md:w-5/6 2xl:w-2/3 lg:flex gap-9  ">

            <div className="w-5/6 lg:w-1/2  m-auto">
                <div className="md:w-3/4 xl:w-2/3 m-auto">
                    <img loading="lazy" src={image} className="m-auto rounded-sm  shadow-md w-96 h-96 object-cover" />
                    <h1 className={`fixed z-10 top-0 left-0 bg-customRed w-full text-center p-2 text-white transition-opacity duration-50 ease-in ${displayMessage ? "opacity-100" : "opacity-0"}`}>Item added to bag!</h1> 
                </div>

                <div className="flex justify-center gap-10 md:w-3/4 m-auto mt-2">
                    <FontAwesomeIcon onClick={() => updateImage("left")} icon={faArrowLeft} className=" p-2 text-xl cursor-pointer" />
                    <FontAwesomeIcon onClick={() => updateImage("right")} icon={faArrowRight} className=" p-2 text-xl cursor-pointer" />
                </div>
            </div>
            <div className="w-5/6 m-auto mt-10 lg:mt-0 flex flex-col  lg:items-start lg:m-0 md:w-4/5 lg:w-1/2 text-center lg:text-left ">
                <div>
                    <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl 2xl:text-4xl ">{item.name}</h1>
                    <p className="w-5/6 lg:w-4/5 mt-5  xl:text-lg m-auto lg:m-0 lg:mt-5 ">{item.description}</p>
                    <div className="mt-2"><span className="font-bold text-md">Materials: </span><div className="flex flex-wrap m-auto lg:m-0 w-2/3 xl:w-1/2 ">{item.materials.map((material, index) => <h2 className="w-1/2 " key={index}>{material}</h2>)}</div></div>
                    {item.colorOptions && item.colorOptions.length > 0 ? <div className="mt-1">
                        <span className="font-bold text-md">Color: </span>
                        <select className="bg-transparent border-none" onChange={(e) => setColor(e.target.value)}>
                            {item.colorOptions.map((color, index) => <option className="bg-slate-200 text-gray-700" key={index} value={color}>{color}</option>)}
                        </select>
                    </div> : " "}
                    <div className="mt-4 flex justify-center lg:justify-start">
                        <Quantity quantity={quantity} setQuantity={setQuantity} />
                       
                    </div>
                </div>
                <div className=" w-full">
                    <h1 className="font-bold text-2xl mt-5">${item.price.toFixed(2)}</h1>
                    <button onClick={() => addItemToCart()} className="bg-gray-900 text-gray-50 w-1/2 p-2 mt-5 rounded-sm text-md hover:transition-colors hover:bg-customRed">ADD TO BAG</button>
                </div>


            </div>

        </div>
    )
}