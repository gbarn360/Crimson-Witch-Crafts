'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars } from '@fortawesome/free-solid-svg-icons';
import {useState,useEffect} from "react"
import { getEventListeners } from 'events';
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
                <div onClick={()=>setClicked(false)} className='bg-gray-500 opacity-70 w-1/2 flex-1 left-0 top-0 bottom-0 absolute z-50'>
                </div>
                <div className='bg-slate-50 w-1/2 right-0 top-0 bottom-0 absolute z-50'>
                    
                </div>
            </div> :
            " "}
            <FontAwesomeIcon onClick={()=>setClicked(!clicked)} icon={faBars} className="text-2xl cursor-pointer"/>
            
        </div>
    )
}