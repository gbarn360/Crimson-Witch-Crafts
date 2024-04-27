
import { getFirestore,doc,deleteDoc} from 'firebase/firestore';
import { app } from "../Firebase/setup";


const db = getFirestore(app);

export async function POST(request:Request){

        const data = await request.json();
        

        await Promise.all(data.map(async(id:string)=>{
            const docRef = doc(db, 'items',id);
            await deleteDoc(docRef);
        }))
        
        return Response.json("success");

        
      
    
}