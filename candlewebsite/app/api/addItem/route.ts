import { getFirestore, collection,doc,setDoc} from 'firebase/firestore';
import { app } from "../Firebase/setup";


const db = getFirestore(app);

export async function POST(request:Request){

        const data = await request.json();
        
        const docRef = doc(collection(db, 'items'));

        await setDoc(docRef, {
            name: data.name,
            category: data.category,
            image: data.image,
            price:data.price,
            description: data.description,
            materials: data.materials,
            colorOptions: data.colorOptions || [] 
        });
        
        return Response.json("success");

        
      
    
}