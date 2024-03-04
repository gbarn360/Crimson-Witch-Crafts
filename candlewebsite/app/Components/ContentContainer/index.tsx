'use client'
import { useState } from 'react'
import ItemThumbnail from '../ItemThumbnail'
export default function contentContainer() {

    const [items, setItems] = useState([{ name: "Caramel & Chocolate and raisins", image: "https://i.etsystatic.com/21554180/r/il/811d84/5003663132/il_570xN.5003663132_7m97.jpg", price: 20 }, { name: "candle", image: "https://i.etsystatic.com/21554180/r/il/811d84/5003663132/il_570xN.5003663132_7m97.jpg", price: 20 }, { name: "candle", image: "https://i.etsystatic.com/21554180/r/il/811d84/5003663132/il_570xN.5003663132_7m97.jpg", price: 20 }, { name: "candle", image: "https://i.etsystatic.com/21554180/r/il/811d84/5003663132/il_570xN.5003663132_7m97.jpg", price: 20 }, { name: "Caramel & Chocolate", image: "https://i.etsystatic.com/21554180/r/il/811d84/5003663132/il_570xN.5003663132_7m97.jpg", price: 20 }])
    return (
        <div className="my-10 mx-auto pt-5  md:w-5/6 ">

            <h1 className='m-auto text-center w-4/5 font-bold text-2xl sm:text-4xl 2xl:text-5xl mb-20'>Handcrafted Magic for Every Occasion</h1>
            <div className='flex flex-wrap'>
                {items.map((item, index) => (
                    <ItemThumbnail key={index} name={item.name} image={item.image} price={item.price} />

                ))}
            </div>
        </div>

    )
}