'use client'
import {useState} from "react"
export default function LoadingItemThumbnails(){

    const[items,setItems] = useState([1,2,3,4,5,6,7])
    return(
        <div className="mt-10 mx-auto pt-5 md:w-5/6 min-h-screen flex sm:flex-row flex-col w-full  flex-wrap  ">
            {items.map((item,index)=> (<div key={index} className=" w-5/6 m-auto flex justify-center md:m-0 md:w-1/2 lg:w-1/3 2xl:w-1/4 h-screen ">
                <div className="pt-4 rounded-3xl bg-gray-200 w-5/6 h-1/2 sm:h-1/3  animate-pulse">
                    <div className="bg-gray-100 rounded-xl h-2/3 w-5/6 m-auto"></div>
                    <h1 className="w-4/5 h-5 rounded-xl mt-2 ml-6  bg-gray-50 "></h1>
                    <h1 className="w-2/5 h-5 rounded-xl mt-2 ml-6   bg-gray-50 "></h1>

                </div>
            </div>))
            }
            
        </div>
    )
}