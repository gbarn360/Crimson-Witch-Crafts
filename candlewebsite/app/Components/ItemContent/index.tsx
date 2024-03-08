
interface Item{
    id:number,
    name:string,
    image:string,
    price:number
}

export default function ItemContent({item}:{item:Item}) {
    


    return(
        <div className = "my-10 mx-auto pt-5 md:w-5/6 2xl:w-2/3 lg:flex justify-between gap-9">

            <div className="w-5/6 m-auto lg:w-1/2 ">
                <img src={item.image} className="m-auto rounded-xl "/>
            </div>
            <div className="w-5/6 m-auto mt-10 lg:mt-0 flex flex-col items-center lg:items-start lg:m-0 lg:w-1/2 ">
               <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl">{item.name}</h1>
               <p className="w-2/3 mt-10 text-xl">A hand poured candle, blood rose scented, in a reusable skull glass. Shimmer on top to make a perfect swirl affect when burning!</p>
               <h1 className=" mt-16"><span className="font-bold">Wax Type: </span> Paraffin</h1>
               <h1 className="font-bold text-2xl mt-5">${item.price}</h1>
               <button className="bg-gray-900 text-gray-50 w-1/2 p-2 rounded-sm">ADD TO BAG</button>

            </div>

        </div>
    )
}