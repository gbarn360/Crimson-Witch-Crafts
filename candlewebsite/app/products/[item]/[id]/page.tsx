'use client'

import Navbar from "@/app/Components/Navbar"
import {useEffect,useState} from "react"
import axios from "axios"

interface item{
    id:number,
    name:string,
    image:string,
    price:number
}

export default function page({ params }: { params: { item: string,id:number } }) {

    useEffect(() =>{
        axios.get(`http://localhost:4000/items/${params.id}`).then(response => setItem(response.data));
    },[]);

    const[item,setItem] = useState<item>();

    return (
        <div>
            <Navbar />
            {item ? 
            
            <div>
                {item.name}
                <img src={item.image} className="w-fit rounded-sm" />    
            </div> :
             <p>loading...</p>}
        </div>
    )
}