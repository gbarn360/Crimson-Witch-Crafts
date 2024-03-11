'use client'
import { useState,useEffect } from 'react'
import ItemThumbnail from '../ItemThumbnail'
import Link from 'next/link'
import axios from 'axios'
import Item from '@/app/Interfaces'


export default function ContentContainer() {

    const [items, setItems] = useState<Item[]>([])

    useEffect(() =>{
    
        axios.get("http://localhost:4000/items").then(response =>{ setItems(response.data)});
    },[]);
    return (
        <div className="my-10 mx-auto pt-5  md:w-5/6 ">
            {/* <h1 className='m-auto text-center w-4/5 font-bold text-2xl sm:text-3xl 2xl:text-5xl mb-20'>Handcrafted Magic for Every Occasion</h1> */}
            <div className='flex flex-wrap'>
                {items.map((item:Item, index:number) => (
                    <Link key={index} href={"/products/[itemPage][id]"} as={`/products/${item.name.replace(/\s/g, "_")}/${item.id}`} className='p-5 sm:w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/5 '>
                        <ItemThumbnail name={item.name} image={item.image} price={item.price} />
                    </Link>


                ))}
            </div>
        </div>

    )
}