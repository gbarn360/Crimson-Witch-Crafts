'use client'

import {useEffect,useState} from "react"
import { getIndividualItem } from "../services";
import { Provider } from "react-redux";
import Navbar from "../Components/Navbar";
import { store } from "../State/state";
import ItemContent from "../Components/ItemContent";
import Footer from "../Components/Footer";
import Loading from "../Components/Loading";

export default function Products() {

    const [item,setItem] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = window.location.href.split("/");
                let id = url[url.length - 1];
                const itemData = await getIndividualItem(id);
                setItem(itemData.item);
            } catch (error) {
                console.error("Error fetching item:", error);
            }
        };

        fetchData();
    }, []);

    
    return (
        <Provider store={store}>
        <Navbar />
        {item ?
            <ItemContent item={item}  /> :
            <Loading />
        }
        <Footer />
    </Provider>
    )
}