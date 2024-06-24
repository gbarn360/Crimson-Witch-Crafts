'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars } from '@fortawesome/free-solid-svg-icons';
import {useState,useEffect} from "react"
import Link from 'next/link';
import HamburgerItemLink from './HamburgerItemLink';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
export default function HamburgerMenu(){

    const[clicked,setClicked] = useState(false);
    
   
    useEffect(()=>{
        if(clicked){
            document.body.style.overflow = "hidden"
        }
        else{
            document.body.style.overflow = "visible"
        }
    },[clicked])
    
   
    
    return(
        <div className="md:hidden  flex items-center pr-5 ">
            {clicked ? 
            <div className='flex overflow:hidden'>
                <div onClick={()=>setClicked(false)} className='bg-gray-500 opacity-70 w-1/2 sm:w-2/3 flex-1 left-0 top-0 bottom-0 absolute z-50'></div>
                <div className='bg-slate-50 w-1/2 sm:w-1/3 right-0 top-0 bottom-0 absolute z-50'>
                   <div className=' flex justify-end m-5 gap-2'>
                        <Link href={"/Cart"} className="">
                                <FontAwesomeIcon icon={faCartShopping} className=" text-customRed text-xl" />
                        </Link>
                        {/* <Link href={"#"}>
                            <FontAwesomeIcon icon={faUser} className=" text-xl " />
                        </Link> */}
                   </div>
                   <div className=' ml-5 '>

                        <Link href={"/category/[category]"} as="/category/Candles">
                            <HamburgerItemLink itemName={"Candles"} subCategories={["Dessert Candles", "Jarred Candles", "Sculptural Candles"]} />
                        </Link>

                        <Link href={"/category[category]"} as="/category/Wax_Melts">
                            <HamburgerItemLink itemName={"Wax Melts"} />
                        </Link>

                        <Link href={"/category/[category]"} as="/category/Containers">
                            <HamburgerItemLink itemName={"Containers"} />
                        </Link>

                        <Link href={"/category/[category]"} as="/category/Other_Creations">
                            <HamburgerItemLink itemName={"Other Creations"} />
                        </Link>

                        {/* <Link href={"/about"}>
                            <HamburgerItemLink itemName={"About Us"} />
                        </Link> */}
                   </div>
                </div>
            </div> :
            " "}
            <FontAwesomeIcon onClick={()=>setClicked(!clicked)} icon={faBars} className="text-2xl cursor-pointer"/>
            
        </div>
    )
}