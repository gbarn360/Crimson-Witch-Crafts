



export default function itemThumbnail({ name, image, price }: { name: string, image: string[], price: number }) {

    return (
        <div className=' hover:transition hover:-translate-y-1 hover:cursor-pointer rounded-3xl '>
            <img src={image[0]} alt={name} className="m-auto rounded-sm shadow-md" />
            <div className="mt-5 text-md md:text-lg">
                <h1 className=" text-gray-900 text-sm xl:text-lg">{name}</h1>
                <h2 className=" mb-2 text-gray-900">${price}</h2>
                <button className="bg-gray-900 text-gray-50 w-full p-2 rounded-sm hover:transition-colors hover:bg-customRed">ADD TO BAG</button>
            </div>
        </div>
    )
}