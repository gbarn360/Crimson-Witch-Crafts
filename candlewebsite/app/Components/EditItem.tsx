import { useState,useEffect } from "react";
import { getAllItems } from "../services";
import Item from "../Interfaces";
export default function EditItem(){

    const[items,setItems] = useState<Item[]>([]);
    const[item,setItem] = useState();
    async function fetchData(){
        let item = await getAllItems();
        setItems(item);
    }
    useEffect(() => {
        fetchData();
    }, []);

    function editItem(item:Item){

    }
    return(
        <div className="w-4/5">
        {items.map((item)=>(<div className="border-2 m-2 p-2 flex justify-between">{item.name} <button className="hover:text-customRed hover:tarnsition-colors"onClick={()=>{editItem(item)}}>edit</button></div>))}

        </div>
    )
}