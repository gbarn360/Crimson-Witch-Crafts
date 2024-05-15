'use client'

import { Provider } from "react-redux";
import { store } from "../State/state";
import {useEffect,useState} from "react"
import { getIndividualItem } from "../services";
import Navbar from "./Navbar";
import ItemContent from "./ItemContent";
import LoadingItemThumbnails from "./LoadingItemThumbnails";
import Footer from "./Footer";
import Item from "../Interfaces";


export default function ItemContainer({item}:{item:Item}){


    // async function fetchData(){
    //     let item = await getIndividualItem(id);
    //     setItem(item);
    // }
    //  useEffect(() => {
    //     fetchData();
    //  }, []);
   
    
    return (
        <Provider store={store}>
            <Navbar />
            {item ?
                <ItemContent item={item} id={item.id} /> :
                <LoadingItemThumbnails />
            }
            <Footer />
        </Provider>
    )
}