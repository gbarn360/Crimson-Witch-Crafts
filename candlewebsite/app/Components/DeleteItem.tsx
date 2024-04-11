'use client'

import {useState,useEffect} from "react"
import { getAllItems } from "../services";
import Item from "../Interfaces";

export default function DeleteItem(){

    const[items,setItems] = useState<Item[]>([]);
    async function fetchData(){
        let item = await getAllItems();
        setItems(item);
    }
    useEffect(() => {
        fetchData();
    }, []);

    function removeItem(name:string){
        setItems((previtems)=>previtems.filter(item=>item.name !== name))
    }
    function saveChanges(){
        
    }



    return(
        <div className=" w-4/5 ">
            {items.map((item,index)=>(<div className=" flex justify-between">{item.name} <button className="hover:text-customRed hover:tarnsition-colors"onClick={()=>{removeItem(item.name)}}>delete</button></div>))}
            <div className="flex justify-center">
            <button className="p-2 border-2" onClick={()=>{saveChanges()}}>save</button>
            </div>
        </div>
    )
}