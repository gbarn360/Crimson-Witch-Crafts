'use client'
import {useState} from "react"
export default function LoadingItemThumbnails(){

    const[items,setItems] = useState([1,2,3,4,5,6,7])
    return(
        <div className="mt-10 mx-auto pt-5 md:w-5/6 min-h-screen flex flex-wrap ">
            {items.map(item => (<div className=" sm:w-1/2 md:w-1/2 lg:w-1/3 2xl:w-1/4 h-90 ">
                <div className="pt-4 rounded-3xl bg-gray-200 w-5/6 h-5/6 animate-pulse">
                    <div className="bg-gray-100 rounded-xl h-2/3 w-5/6 m-auto"></div>
                    <h1 className="w-4/5 h-5 rounded-xl mt-2 ml-6  bg-gray-50 "></h1>
                    <h1 className="w-2/5 h-5 rounded-xl mt-2 ml-6   bg-gray-50 "></h1>

                </div>
            </div>))
            }
            
        </div>
    )
}