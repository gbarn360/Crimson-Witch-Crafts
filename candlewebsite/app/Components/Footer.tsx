


export default function Footer(){
    return(
        <div className="bg-gray-300  py-10 mt-20">
            <div className="text-center m-1 md:w-4/5 lg:w-1/4  flex flex-col sm:m-auto gap-10 md:text-start sm:flex-row md:gap-0">
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