
interface candleItem{
    name: string,
    category: string,
    price: number,
    images: string[],
    materials: string[],
    scent: string,
    description: string
}

export default function itemThumbnail({name,image,price}:{name:string,image:string,price:number}) {

    return (
        <div className='border-b-4 border-b-transparent px-5 my-5 md:w-1/2 lg:w-1/3 xl:w-1/4 text-center hover:border-b-gray-200 hover:cursor-pointer hover:transition-all '>
             <img src={image} alt={name}  className="m-auto rounded-xl" />

            <div className="mt-5 flex justify-between mx-4 mb-5 ">
            <h1 className="text-lg">{name}</h1>
           <h2 className="text-lg">${price}.00</h2>
            </div>
        </div>
    )
}