
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
        <div className='border-b-4 border-b-transparent mx-5 my-1  md:w-1/3 lg:w-1/4 xl:w-1/5 text-center hover:border-b-gray-200 hover:cursor-pointer '>
             <img src={image} alt={name}  className="m-auto" />

            <div className="flex mt-5 flex justify-between mx-4">
            <h1 className="text-lg">{name}</h1>
           <h2 className="text-lg">${price}.00</h2>
            </div>
        </div>
    )
}