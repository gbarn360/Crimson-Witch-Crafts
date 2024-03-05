
import Navbar from "../Components/Navbar"

export default function page({ params }: { params: { category: string } }) {


    return (
        <div>
            <Navbar />
            {params.category.replace(/_/g, " ")}
        </div>
    )
}