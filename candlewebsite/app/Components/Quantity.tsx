'use client'

import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faMinus } from '@fortawesome/free-solid-svg-icons';

export default function Quantity({quantity,setQuantity}:{quantity:number,setQuantity:(quantity:number)=>void}){

    return (
        <div className="flex gap-5 border-2 px-4 py-2 border-slate-900">
            <button onClick={()=>quantity >= 2 ? setQuantity(quantity - 1) : null}><FontAwesomeIcon className="text-sm" icon={faMinus} /></button>
           <h2> {quantity} </h2>
            <button onClick={()=>quantity <= 9 ? setQuantity(quantity + 1) : null}><FontAwesomeIcon className="text-sm" icon={ faPlus} /></button>
        </div>
    )
}