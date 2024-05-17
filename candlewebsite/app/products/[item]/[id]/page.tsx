
import Item from "@/app/Interfaces"
import ItemContainer from "@/app/Components/ItemContainer";
import { getFirestore, collection, getDocs, doc, getDoc} from 'firebase/firestore';
import {app} from "../../../api/Firebase/setup"


const db = getFirestore(app);

export async function generateStaticParams() {
    const querySnapshot = await getDocs(collection(db, "items"));

    const items: Item[] = [];
    querySnapshot.forEach((doc) => {
        
       let itemData = doc.data() as Item;
       itemData.id = doc.id;
        items.push(itemData);
    });

   return items.map((item:Item)=> ({
    item: item.name.replace(/\s/g, "_"),
    id:item.id
   }))
}

export default async function Products({ params }: { params: { item: string, id: string } }) {

    
    async function fetchData(){
        'use server'
          const itemDocRef = doc(db,`items/${params.id}`)
    const itemDocSnapshot = await getDoc(itemDocRef);

    if (itemDocSnapshot.exists()) {
        const itemData = itemDocSnapshot.data() as Item;
       return(<ItemContainer item={itemData}/>)
    } else {
        console.log("error");
    }
    }
    
    return (
        <>{fetchData()}</>
    )
}