'use client'
import { LinkItem } from "@/app/Interfaces"
import {useState} from "react"
import Link from "next/link";
export default function HamburgerItemLink({ itemName, subCategories }: LinkItem){

    return(
        <div>
            <h1 className="sm:text-xl">{itemName}</h1>

            {subCategories ?
                    <div className="ml-2 mb-2">{subCategories.map((item, index) => (<Link key={index} href={"/category/[category]"} as={`/category/${item.replace(/\s/g, "_")}`}><h1 className="text-sm" key={index}>{item.replace("_", " ")}</h1></Link>))}</div> :
                    <div></div>
            }
        </div>
        
    )
}