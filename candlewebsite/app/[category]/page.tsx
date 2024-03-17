"use client"
import Navbar from "../Components/Navbar"
import axios from "axios"
import { useState, useEffect } from "react"
import Item from "../Interfaces"
import Link from "next/link"
import ItemThumbnail from "../Components/ItemThumbnail"
import { getAllItems } from "../services"
import { Provider } from "react-redux"
import { store } from "../State/state"
import ContentContainer from "../Components/ContentContainer"

export default function page({ params }: { params: { category: string } }) {

    const [items, setItems] = useState<Item[]>([]);

    async function fetchData() {
        let category = params.category.replace(/_/g, " ");

        let response = await getAllItems();

        if (category === "Candles") { //get all subcategories candles
            setItems(response.filter((item: Item) => item.category.split(" ")[1] === category));

        }
        else { //if item is not a candle (candle has multiple sub categories)
            setItems(response.filter((item: Item) => item.category === category));
        }

    }
    useEffect(() => {
        fetchData();
    }, [])




    return (
        <Provider store ={store}>
            <Navbar />
            <ContentContainer items={items}/>
        </Provider>
    )
}