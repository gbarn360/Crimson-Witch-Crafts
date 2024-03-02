
import ItemLink from "../ItemLink"
export default function navbar() {
    return (
        <div className=" border-b-2 flex justify-center sticky top-0">
            <div className="mt-5">
                <h1 className=" text-2xl mb-5 text-center ">Crimson Witch Crafts</h1>
                <div className="flex justify-center gap-7 h-7">
                    <ItemLink itemName={"Intention Candles"} />
                    <ItemLink itemName={"Dessert Candles"} />
                    <ItemLink itemName={"Jarred Candles"} />
                    <ItemLink itemName={"Sculptural Candles"} />
                    <ItemLink itemName={"Wax Melts"} />
                    <ItemLink itemName={"About us"} />

                </div>
            </div>
        </div >
    )
}