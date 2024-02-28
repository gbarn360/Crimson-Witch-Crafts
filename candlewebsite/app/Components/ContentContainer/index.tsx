'use client'
import { useState } from 'react'

export default function contentContainer() {

    const [items, setItems] = useState(["test", "test 2", "test 3", "test 4", "test 5", "test 6"])
    return (
        <div className=" m-auto pt-5 flex flex-wrap justify-center">
            {items.map((item, index) => (
                <div key={index} className='mx-5 my-1 w-full  sm:w-1/3 xl:w-1/4 text-center bg-red-500'>{item}</div>
            ))}
        </div>
    )
}