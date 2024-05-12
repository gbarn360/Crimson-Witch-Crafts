import { getFirestore, collection,doc,setDoc} from 'firebase/firestore';
import { app } from "../Firebase/setup";
import { getAuth } from "firebase-admin/auth"; 
import { getApps } from 'firebase/app';
import { credential, initializeApp } from 'firebase-admin';

if (!getApps().length) {
    const serviceAccount = require("../../../firebasesdk.json"); // Path to your service account key
  
    initializeApp({
      credential: credential.cert(serviceAccount),
    });
  }
  
  
const db = getFirestore(app);

export async function POST(request:Request){


        const Authorization = request.headers.get('Authorization');
        const data = await request.json();
        
        if (!Authorization) {
            return new Response("Unauthorized", { status: 401 });
          }
    
        const token = Authorization.split(" ")[1];
        try{
            // const decodedToken = await auth.verifyIdToken(token);
            getAuth().verifyIdToken(token).then(async(decodedToken) =>{
            
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
        
            })
            .catch((error) => { 
              console.log(error)});
    
    
            
        
            return Response.json("success")
        }catch(err){
            console.log(err);
            return new Response("Unauthorized", { status: 401 });
    
        }
       
        
      
    
}