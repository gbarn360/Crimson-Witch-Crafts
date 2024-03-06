

interface candleItem {
    name: string,
    category: string,
    price: number,
    images: string[],
    materials: string[],
    scent: string,
    description: string
}

export default function itemThumbnail({ name, image, price }: { name: string, image: string, price: number }) {

    return (
        <div className=' hover:transition hover:-translate-y-1 hover:cursor-pointer rounded-3xl'>
            <img src={image} alt={name} className="m-auto rounded-sm" />
            <div className="mt-5 ">
                <h1 className="text-sm text-gray-900">{name}</h1>
                <h2 className="text-sm mb-2 text-gray-900">${price}</h2>
                <button className="bg-gray-900 text-gray-50 w-full p-2 rounded-sm">ADD TO BAG</button>
            </div>
        </div>
    )
}