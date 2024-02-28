'use client'

import { updateSelection } from "@/app/services"
export default function ItemLink({ itemName }: { itemName: string }) {

    return (
        <h1 onClick={() => updateSelection(itemName)} className="text-sm cursor-pointer hover:border-b-2 border-red-500 ">{itemName}</h1>
    )
}