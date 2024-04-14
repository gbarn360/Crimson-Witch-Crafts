'use client'
import AdminBtn from "../Components/AdminBtn"
import AddItem from "../Components/AddItem"
import DeleteItem from "../Components/DeleteItem"
import EditItem from "../Components/EditItem"
import { useState} from "react"

export default function AdminDashboard(){

    const[component,updateComponent] =  useState<JSX.Element | null>(null);
    const [selectedButton,setSelectedButton] = useState("");
    return(
        <div >
            <div className="flex min-w-80 m-auto justify-center mt-20 gap-20">
                <AdminBtn  text="Add an Item" selected={selectedButton === "add"}  setButton={()=> setSelectedButton("add")} setComponent={() => updateComponent(<AddItem />)} />
                <AdminBtn  text="Delete Items"selected={selectedButton === "delete"} setButton={()=> setSelectedButton("delete")} setComponent={() => updateComponent(<DeleteItem />)} />
                <AdminBtn  text="Edit an Item"selected={selectedButton === "edit"} setButton={()=> setSelectedButton("edit")} setComponent={() => updateComponent(<EditItem />)} />
            </div>
           
            <div className="w-4/5 m-auto mt-20 flex justify-center">
                {component}
            </div>
        </div>
    )
}