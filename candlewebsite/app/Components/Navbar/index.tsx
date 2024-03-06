import ItemLink from "../ItemLink"
import Link from 'next/link';


export default function navbar() {
    return (
        <div className=" bg-slate-50 ">
            <div className="w-5/6 m-auto flex flex-col">
                <Link href={"/"}>
                    <img src='/Image/companyLogo.png' className=' w-1/5 m-auto' />
                </Link>

                <div className="flex justify-center gap-10  w-2/3 m-auto   ">

                    <Link href={"/[category]"} as="Candles">
                        <ItemLink itemName={"Candles"} subCategories={["Dessert Candles", "Jarred Candles", "Sculptural Candles"]} />
                    </Link>

                    <Link href={"/[category]"} as="Wax_Melts">
                        <ItemLink itemName={"Wax Melts"} />
                    </Link>

                    <Link href={"/[category]"} as="Containers">
                        <ItemLink itemName={"Containers"} />
                    </Link>

                    <Link href={"/about"}>
                        <ItemLink itemName={"About Us"} />
                    </Link>
                </div>

            </div>
        </div >
    )
}