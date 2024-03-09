
import Item from "@/app/Interfaces"


export default function ItemContent({item}:{item:Item}) {
    


    return(
        <div className = "my-10 mb-40 mx-auto pt-5 md:w-5/6 2xl:w-2/3 lg:flex justify-between gap-9 ">

            <div className="w-5/6 m-auto lg:w-1/2 ">
                <img src={item.image[0]} className="m-auto rounded-xl "/>
            </div>
            <div className="w-5/6 m-auto mt-10 lg:mt-0 flex flex-col items-center lg:items-start lg:m-0 md:w-4/5 lg:w-1/2  text-center lg:text-left ">
               <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl ">{item.name}</h1>
               <p className="w-5/6 lg:w-4/5 mt-10 text-xl ">{item.description}</p>
               <h1 className=" mt-16"><span className="font-bold">Materials: </span>{item.materials.map((material)=><h2>{material}</h2>)}</h1>
               <h1 className="font-bold text-2xl mt-5">${item.price}</h1>
               <button className="bg-gray-900 text-gray-50 w-1/2 p-2 rounded-sm">ADD TO BAG</button>

            </div>

        </div>
    )
}