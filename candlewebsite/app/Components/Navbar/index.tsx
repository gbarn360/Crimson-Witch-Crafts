import ItemLink from "../ItemLink"
import Link from 'next/link';


export default function navbar() {
    return (
        <div className=" border-b-2 flex justify-center sticky top-0 bg-white">
            <div className="mt-5">
                <Link href={"/"}>
                    <h1 className=" text-2xl mb-5 text-center cursor-pointer">Crimson Witch Crafts</h1>
                </Link>

                <div className="flex justify-center gap-7 h-7">

                    <Link href={"/[category]"} as="Intention_Candles">
                        <ItemLink itemName={"Intention Candles"} /> 
                    </Link>

                    <Link href={"/[category]"} as="Dessert_Candles">
                        <ItemLink itemName={"Dessert Candles"} />
                    </Link>

                    <Link href={"/[category]"} as="Jarred_Candles">
                        <ItemLink itemName={"Jarred Candles"} />
                    </Link>

                    <Link href={"/[category]"} as="Sculptural_Candles">
                        <ItemLink itemName={"Sculptural Candles"} />
                    </Link>

                    <Link href={"/[category]"} as="Wax_Melts">
                        <ItemLink itemName={"Wax Melts"} />
                    </Link>

                    <Link href={"/about"}>
                        <ItemLink itemName={"About us"} />
                    </Link> 


                </div>
            </div>
        </div >
    )
}