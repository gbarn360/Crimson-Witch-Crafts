'use client'
import { Provider } from "react-redux"
import { store } from "../State/state"
import { useState,useEffect } from "react"
import Item from "../Interfaces"
import Navbar from "./Navbar"
import Footer from "./Footer"
import ContentContainer from "./ContentContainer"
import LoadingItemThumbnails from "./LoadingItemThumbnails"
import { getAllItems } from "../services"



export default function CategoryContainer({category}:{category:string}){


    const[items,setItems] = useState<Item[]>([])
    async function getItemsByCategory(){

        let items:Item[] = await getAllItems();
    
    
        if (category === "Candles") { //get all subcategories candles
            setItems(items.filter((item) => item.category.includes('Candles'))) 
    
        }
        else { //if item is not a candle (candle has multiple sub categories)
            setItems(items.filter((item) => item.category.includes(category.replace(/_/g, ' '))));
        }
    
    }
    useEffect(() =>{
        const fetchData = async()=>{
            getItemsByCategory();
        }

        fetchData();
    },[])
    return(
        <Provider store={store}>
            <div className="flex flex-col justify-between ">
                <Navbar />
                <h1 className="text-center text-4xl mt-10 -mb-10">{category}</h1>
                {items.length > 0 ? <ContentContainer items={items}/> : <LoadingItemThumbnails />}
                <Footer />
            </div>
                
            
        </Provider>
    )
}