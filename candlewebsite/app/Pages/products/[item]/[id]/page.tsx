'use client'

import Navbar from "@/app/Components/Navbar"
import { useEffect, useState } from "react"
import ItemContent from "@/app/Components/ItemContent"
import Item from "@/app/Interfaces"
import Loading from "@/app/Loading/page"
import { getIndividualItem } from "@/app/services"

export default function page({ params }: { params: { item: string, id: number } }) {
    
    async function fetchData(){
        let item = await getIndividualItem(params.id);
        setItem(item);
    }
     useEffect(() => {
         fetchData();
     }, []);
   

    const [item, setItem] = useState<Item>();

    return (
        <div id="div">
            <Navbar />
            {item ?

                <ItemContent item={item} /> :
                <Loading />
            }
        </div>
    )
}