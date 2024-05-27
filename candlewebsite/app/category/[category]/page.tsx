import Item from "../../Interfaces"
import { getAllItems } from "../../services"
import CategoryContainer from "@/app/Components/CategoryContainer";


export function generateStaticParams() {
    return [
        {category:"Candles"},
        {category:"Wax_Melts"},
        {category:"Containers"},
        {category:"Dessert_Candles"},
        {category:"Jarred_Candles"},
        {category:"Sculptural_Candles"},
        {category:"Other_Creations"}

    ];

}


   

export default function Category({ params}:{params:{category:string}}) {

    const category = params.category.replace(/_/g, ' ');


    return (
        <CategoryContainer category={category}  />
    )
}