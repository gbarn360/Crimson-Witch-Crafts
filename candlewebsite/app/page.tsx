'use client'
import {store} from "./State/state"
import { Provider } from 'react-redux';
import Navbar from "./Components/Navbar";
import { useState, useEffect} from 'react';
import Item from '@/app/Interfaces';
import { getAllItems } from '@/app/services';
import ContentContainer from "./Components/ContentContainer";
import Footer from "./Components/Footer";
import Loading from "./Components/Loading";
export default function page() {


    const [items, setItems] = useState<Item[]>([]);

    async function fetchData() {
        let items = await getAllItems();
        setItems(items);
    }
    
   

    useEffect(() => {
            fetchData();
    }, []);


    return (
        <Provider store={store}>
                <Navbar />
                {items.length > 0 ? <ContentContainer items={items}/> : <Loading /> }
                <Footer />            
        </Provider>
    )
}