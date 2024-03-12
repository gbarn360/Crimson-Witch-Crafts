import ItemLink from "../ItemLink"
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping,faUser } from '@fortawesome/free-solid-svg-icons';

export default function navbar() {
    return (
        <div className=" bg-slate-50 ">
            <div className=" w-4/5 m-auto flex flex-col ">
                <Link href={"/"}>
                    <img src='/Image/companyLogo.png' className=' w-2/3 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 m-auto' />
                </Link>

                <div className=" w-full flex relative">

                    <div className="flex justify-center gap-10 m-auto  ">
                        <Link href={"/[category]"} as="/Candles">
                            <ItemLink itemName={"Candles"} subCategories={["Dessert Candles", "Jarred Candles", "Sculptural Candles"]} />
                        </Link>

                        <Link href={"/[category]"} as="/Wax_Melts">
                            <ItemLink itemName={"Wax Melts"} />
                        </Link>

                        <Link href={"/[category]"} as="/Containers">
                            <ItemLink itemName={"Containers"} />
                        </Link>

                        <Link href={"/about"}>
                            <ItemLink itemName={"About Us"} />
                        </Link>
                    </div>
                    <div className="flex gap-5 absolute right-0">
                        <Link href={"#"} className="">
                            <FontAwesomeIcon icon={faCartShopping} className=" text-customRed w-6"/>
                        </Link>
                        <Link href={"#"}>
                            <FontAwesomeIcon icon={faUser} className="w-5 "/>
                        </Link>
                    </div>
                </div>

            </div>
        </div >
    )
}