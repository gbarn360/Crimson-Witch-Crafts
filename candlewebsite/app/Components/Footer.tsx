'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';


export default function Footer(){
    return(
        <div className="bg-gray-300  py-10 w-full mt-20 relative">

            <Link href={"/AdminLogin"} className="absolute top-3 right-3">
                <FontAwesomeIcon icon={faUser} className=" text-xl text-gray-100 " />
            </Link>
            <div className="text-center m-1 md:w-4/5   flex flex-col justify-between  sm:m-auto md:text-start sm:flex-row ">
                <div className="sm:w-1/2 flex flex-col gap-y-2">
                    <h1 >Company Location</h1>
                    <h2 className="font-bold ">Pennsylvania, US</h2>
                </div>
                <div className="sm:w-1/2 flex flex-col gap-y-2 ">
                    <h1>Contact Info</h1>
                    <h2 className="font-bold">crimsonwitchcraft@email.com</h2>
                    <h2 className="font-bold">(xxx)-xxx-xxxx</h2>

                </div>
            </div>
        </div>
    )
}