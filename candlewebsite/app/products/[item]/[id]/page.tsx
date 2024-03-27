'use client'

import Navbar from "@/app/Components/Navbar"
import Footer from "@/app/Components/Footer"
import { useEffect, useState } from "react"
import ItemContent from "@/app/Components/ItemContent"
import Item from "@/app/Interfaces"
import Loading from "@/app/Components/Loading"
import { getIndividualItem } from "@/app/services"
import { Provider } from "react-redux"
import { store } from "@/app/State/state"

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
        <Provider store={store}>
            <Navbar />
            {item ?

                <ItemContent item={item} /> :
                <Loading />
            }
            <Footer />
        </Provider>
    )
}