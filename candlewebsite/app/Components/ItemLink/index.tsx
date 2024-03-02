
export default function ItemLink({ itemName }: { itemName: string }) {

    return (
        <h1 className="text-sm cursor-pointer hover:border-b-2 border-red-500 ">{itemName}</h1>
    )
}