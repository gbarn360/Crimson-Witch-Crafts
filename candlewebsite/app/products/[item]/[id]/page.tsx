'use client'

import Navbar from "@/app/Components/Navbar"
import {useEffect,useState} from "react"
import axios from "axios"
import ItemContent from "@/app/Components/ItemContent"
import Item from "@/app/Interfaces"
import Loading from "@/app/Loading/page"

export default function page({ params }: { params: { item: string,id:number } }) {

    useEffect(() =>{
        console.log(params.id)
        axios.get(`http://localhost:4000/items/${params.id}`).then(response => setItem(response.data));
    },[]);

    const[item,setItem] = useState<Item>();

    return (
        <div>
            <Navbar />
            {item ? 
            
            <ItemContent item={item}/>:
             <Loading />
             }
        </div>
    )
}