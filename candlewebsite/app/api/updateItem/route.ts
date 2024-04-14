import { getFirestore, collection,doc,setDoc} from 'firebase/firestore';
import { app } from "../Firebase/setup";


const db = getFirestore(app);

export async function POST(request:Request){

    const data = await request.json();
    const docRef = doc(db, 'items',data.id);

    await setDoc(docRef, {
        name: data.item.name,
        category: data.item.category,
        image: data.item.image,
        price:data.item.price,
        description: data.item.description,
        materials: data.item.materials,
        colorOptions: data.item.colorOptions || [] 
    });

    return Response.json("success")
}