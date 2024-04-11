'use client'
import AdminBtn from "../Components/AdminBtn"
import AddItem from "../Components/AddItem"
import DeleteItem from "../Components/DeleteItem"
import { useState } from "react"

export default function AdminDashboard(){

    const[component,updateComponent] =  useState<JSX.Element | null>(null);
    return(
        <div >
            <div className="flex min-w-80 m-auto justify-center mt-20 gap-20">
                <AdminBtn text="Add an Item" setComponent={() => updateComponent(<AddItem />)} />
                <AdminBtn text="Delete Items" setComponent={() => updateComponent(<DeleteItem />)} />
                <AdminBtn text="Edit an Item" setComponent={() => updateComponent(<DeleteItem />)} />
            </div>
           
            <div className="w-4/5 m-auto mt-20 flex justify-center">
                {component}
            </div>
        </div>
    )
}