'use client'
import { useState,useEffect } from 'react'
import ItemThumbnail from '../ItemThumbnail'
import Link from 'next/link'
import Item from '@/app/Interfaces'
import { getAllItems } from '@/app/services'


export default function ContentContainer() {

    const [items, setItems] = useState<Item[]>([])

   
   async function fetchData(){
       let items = await getAllItems();
       setItems(items);
   }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="my-10 mx-auto pt-5  md:w-5/6 ">
            {/* <h1 className='m-auto text-center w-4/5 font-bold text-2xl sm:text-3xl 2xl:text-5xl mb-20'>Handcrafted Magic for Every Occasion</h1> */}
            <div className='flex flex-wrap'>
                {items.map((item:Item, index:number) => (
                    <Link key={index} href={"/products/[itemPage][id]"} as={`/products/${item.name.replace(/\s/g, "_")}/${item.id}`} className='p-5 sm:w-1/2 md:w-1/3 2xl:w-1/4 '>
                        <ItemThumbnail name={item.name} image={item.image} price={item.price} />
                    </Link>


                ))}
            </div>
        </div>

    )
}