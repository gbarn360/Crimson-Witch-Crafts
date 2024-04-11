'use client'
import AdminBtn from "../Components/AdminBtn"
import AddItem from "../Components/AddItem"
import DeleteItem from "../Components/DeleteItem"
import { useState } from "react"

export default function AdminDashboard(){

    const[component,displayComponent] = useState(<DeleteItem />)
    return(
        <div >
            <div className=" flex min-w-80 m-auto justify-center mt-20 gap-20">
                <AdminBtn text="Add an Item"/>
                <AdminBtn text="Delete an Item"/>
                <AdminBtn text="Edit an Item"/>
            </div>
           
            <div className="w-4/5 m-auto mt-20 flex justify-center">
                {component}
            </div>
        </div>
    )
}