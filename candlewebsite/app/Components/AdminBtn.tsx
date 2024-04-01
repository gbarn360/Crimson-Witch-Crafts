'use client'


export default function AdminBtn({text}:{text:string}){
    return(
        <button className="border-2 p-2 hover:bg-customRed hover:text-white hover:border-customRed transition-colors">{text}</button>

    )
}