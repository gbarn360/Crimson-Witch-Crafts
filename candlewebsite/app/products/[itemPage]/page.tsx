import Navbar from "@/app/Components/Navbar"

export default function page({ params }: { params: { itemPage: string } }) {

    return (
        <div>
            <Navbar />
            {params.itemPage.replace("%26", "&").replace(/_/g, " ")}

        </div>
    )
}