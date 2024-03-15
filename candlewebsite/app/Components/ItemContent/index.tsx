"use client"
import Item from "@/app/Interfaces"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/State/state";
import { addItem } from "@/app/State/Cart/CartSlice";



export default function ItemContent({ item }: { item: Item }) {

    const cart = useSelector((state : RootState)=> state.cart.cartItems)
    const dispatch = useDispatch();

    function addItemToCart(){
        dispatch(addItem({id:item.id,name:item.name,image:item.image,price:item.price,color: color,quantity: 1}));

    }


    const [image, setImage] = useState(item.image[0]);
    const [color,setColor] = useState(item.colorOptions ?item.colorOptions[0] : null);

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
        <div className="my-10 mb-40 mx-auto pt-5 md:w-5/6 2xl:w-2/3 lg:flex  gap-9 ">

            <div className="w-5/6 m-auto lg:w-1/2 ">
                <img src={image} className="m-auto rounded-sm md:w-3/4 xl:w-2/3 shadow-md"  />
                <div className="flex justify-center gap-10 md:w-3/4 m-auto mt-2">
                    <FontAwesomeIcon onClick={() => updateImage("left")} icon={faArrowLeft} className=" p-2 text-xl cursor-pointer" />
                    <FontAwesomeIcon onClick={() => updateImage("right")} icon={faArrowRight} className=" p-2 text-xl cursor-pointer" />
                </div>
            </div>
            <div className="w-5/6 m-auto mt-10 lg:mt-0 flex flex-col  lg:items-start lg:m-0 md:w-4/5 lg:w-1/2 text-center lg:text-left ">
                <div>
                    <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl ">{item.name}</h1>
                    <p className="w-5/6 lg:w-4/5 mt-5 text-md xl:text-xl m-auto lg:m-0 lg:mt-5">{item.description}</p>
                    <div className="mt-2"><span className="font-bold text-md">Materials: </span>{item.materials.map((material, index) => <h2 key={index}>{material}</h2>)}</div>
                    {item.colorOptions ? <div className="mt-1"> 
                        <span className="font-bold text-md">Color: </span>
                        <select className="bg-transparent border-none" onChange={(e)=>setColor(e.target.value)}>
                            {item.colorOptions.map((color, index) => <option className="bg-slate-200 text-gray-700" key={index} value={color}>{color}</option>)}
                        </select>
                    </div> : " "}
                </div>
                <div className=" w-full">
                    <h1 className="font-bold text-2xl mt-5">${item.price}</h1>
                    <button onClick={()=>addItemToCart()} className="bg-gray-900 text-gray-50 w-1/2 p-2 rounded-sm text-md hover:transition-colors hover:bg-customRed">ADD TO BAG</button>
                </div>
         

            </div>

        </div>
    )
}