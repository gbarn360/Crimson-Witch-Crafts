import ItemLink from "../ItemLink"
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import HamburgerMenu from "../HamburgerMenu";

export default function navbar() {
    return (
        <div className=" bg-slate-50 ">
            <div className=" md:w-4/5 md:m-auto flex justify-between md:flex-col ">

                <Link href={"/"} className="ml-5 w-1/3 sm:w-1/4 md:w-2/3 flex justify-start md:m-auto">
                    <img src='/Image/companyLogo.png' className=' md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 md:m-auto' />
                </Link>
                <HamburgerMenu />

                <div className=" w-full hidden md:flex relative ">

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
                        <Link href={"/Cart"} className="">
                            <FontAwesomeIcon icon={faCartShopping} className=" text-customRed text-xl" />
                        </Link>
                        <Link href={"#"}>
                            <FontAwesomeIcon icon={faUser} className=" text-xl " />
                        </Link>
                    </div>
                </div>

            </div>
        </div >
    )
}