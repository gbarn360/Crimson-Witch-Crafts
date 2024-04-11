'use client'

import {useState,useEffect} from "react"
import { getAllItems,deleteItem } from "../services";
import Item from "../Interfaces";

export default function DeleteItem(){

    const[items,setItems] = useState<Item[]>([]);
    const [copy,setCopy] = useState<Item[]>([]);
    const[deletedItems,setdeletedItems] = useState<Item[]>([]);
    const [changesMade,setChangesMade] = useState(false);
    const [message,setMessage] = useState("");
    async function fetchData(){
        let item = await getAllItems();
        setItems(item);
        setCopy(item);
    }
    useEffect(() => {
        fetchData();
    }, []);

    function removeItem(itemToDelete: Item) {
        setItems((previtems)=>previtems.filter(item=>item.name !== itemToDelete.name))
        setdeletedItems((prevItems)=>[...prevItems,itemToDelete]);
        setChangesMade(true);
    }
    async function saveChanges(){
        await deleteItem(deletedItems)
        setMessage("your catalog has been updated");
        setdeletedItems([]);
        setChangesMade(false);
        setCopy(items)
    }
    function resetChanges(){
        setItems(copy)
        setChangesMade(false);
    }



    return(
        <div className=" w-4/5 ">
            {items.map((item)=>(<div className="border-2 m-2 p-2 flex justify-between">{item.name} <button className="hover:text-customRed hover:tarnsition-colors"onClick={()=>{removeItem(item)}}>delete</button></div>))}
            <div className="flex justify-center gap-2">
            <button disabled={!changesMade} className={ !changesMade ? `text-gray-300 p-2 border-2` : 'p-2 border-2'} onClick={()=>{saveChanges()}}>save</button>
            <button disabled={!changesMade} className={ !changesMade ? `text-gray-300 p-2 border-2` : 'p-2 border-2'} onClick={()=>{resetChanges()}}>undo changes</button>
            </div>
            <h1 className="text-center mt-5">{message}</h1>
        </div>
    )
}