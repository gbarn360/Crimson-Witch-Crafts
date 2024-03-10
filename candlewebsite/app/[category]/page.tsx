"use client"
import Navbar from "../Components/Navbar"
import axios from "axios"
import { useState, useEffect } from "react"
import Item from "../Interfaces"
import Link from "next/link"
import ItemThumbnail from "../Components/ItemThumbnail"
export default function page({ params }: { params: { category: string } }) {

    useEffect(() => {
        let category = params.category.replace(/_/g, " ");
        console.log(category)

        axios.get("http://localhost:4000/items").then(response => setCategory(response.data.filter((item: Item) => item.category === category)));

    }, [])

    const [category, setCategory] = useState<Item[]>([]);

    return (
        <div>
            <Navbar />

            <div className="my-10 mx-auto pt-5  md:w-5/6 ">
                {/* <h1 className='m-auto text-center w-4/5 font-bold text-2xl sm:text-3xl 2xl:text-5xl mb-20'>Handcrafted Magic for Every Occasion</h1> */}
                <div className='flex flex-wrap'>
                    {category.map((item: Item, index: number) => (
                        <Link key={index} href={"/products/[itemPage][id]"} as={`/products/${item.name.replace(/\s/g, "_")}/${item.id}`} className='p-5 sm:w-1/2 md:w-1/3 2xl:w-1/4'>
                            <ItemThumbnail name={item.name} image={item.image} price={item.price} />
                        </Link>


                    ))}
                </div>
            </div>
        </div>
    )
}