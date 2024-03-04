import ItemLink from "../ItemLink"
import Link from 'next/link';


export default function navbar() {
    return (
        <div className="flex justify-center sticky top-0 bg-slate-50 z-20">
            <div className="mt-5">
                <Link href={"/"}>
                    <h1 className=" text-2xl mb-5 text-center cursor-pointer">Crimson Witch Crafts</h1>
                </Link>

                <div className="flex justify-center gap-7 h-7">

                    <Link href={"/[category]"} as="Candles">
                        <ItemLink itemName={"Candles"} subCategories={["Dessert_Candles", "Jarred_Candles", "Sculptural_Candles"]} />
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