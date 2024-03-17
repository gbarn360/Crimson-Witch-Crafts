'use client'
import { useState,useEffect } from "react"
import Link from "next/link"
import { LinkItem } from "@/app/Interfaces";



export default function ItemLink({ itemName, subCategories }: LinkItem) {

    const [hovered, setHovered] = useState(false);



    return (
        <div>
            <h1 onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className=" hover:border-b-customRed hover:transition-colors border-b-2 border-b-transparent text-sm xl:text-lg cursor-pointer">{itemName}</h1>
            {hovered && subCategories ?
                <div onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="bg-slate-200 text-gray-700 p-2 text-xs xl:text-sm z-30 absolute rounded-sm">
                    {subCategories.map((item, index) => (<Link key={index} href={"/[category]"} as={`/${item.replace(/\s/g, "_")}`}><h1 className="my-2 hover:text-gray-400" key={index}>{item.replace("_", " ")}</h1></Link>))}
                </div> :
                <div> </div>}
        </div>
    )
}