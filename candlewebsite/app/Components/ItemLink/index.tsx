'use client'
import { useState } from "react"
import Link from "next/link"

interface props {
    itemName: string,
    subCategories?: string[]
}

export default function ItemLink({ itemName, subCategories }: props) {

    const [hovered, setHovered] = useState(false);



    return (
        <div>
            <h1 onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="text-sm cursor-pointer">{itemName}</h1>
            {hovered && subCategories ?
                <div onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="bg-slate-200 text-gray-700 p-2 text-xs absolute rounded-sm">
                    {subCategories?.map((item, index) => (<Link key={index} href={"/[category]"} as={item.replace(/\s/g, "_")}><h1 className="my-2 hover:text-gray-400" key={index}>{item.replace("_", " ")}</h1></Link>))}
                </div> :
                <div> </div>}
        </div>
    )
}