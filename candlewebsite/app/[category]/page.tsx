"use client"
import Navbar from "../Components/Navbar"
import { useState, useEffect } from "react"
import Item from "../Interfaces"
import Footer from "../Components/Footer"
import { getAllItems } from "../services"
import { Provider } from "react-redux"
import { store } from "../State/state"
import ContentContainer from "../Components/ContentContainer"

export default function page({ params }: { params: { category: string } }) {

    const [items, setItems] = useState<Item[]>([]);
    const [category, setCategory] = useState(params.category.replace(/_/g, " "))

    async function fetchData() {

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
        <Provider store={store}>
            <Navbar />
            <h1 className="text-center text-4xl mt-10 -mb-10">{category}</h1>
            <ContentContainer items={items} />
            <Footer />
        </Provider>
    )
}