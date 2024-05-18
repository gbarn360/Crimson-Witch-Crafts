import { initializeApp, getApps } from "firebase-admin/app"; // Admin SDK for server-side initialization
import { getFirestore,doc,setDoc} from 'firebase/firestore';
import { app } from "../Firebase/setup";
import { getAuth } from "firebase-admin/auth"; 
import { credential } from "firebase-admin";


if (!getApps().length) {
    const serviceAccount = require("../../../../firebasesdk.json"); // Path to your service account key
  
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
        })
        .catch((error) => { 
          console.log(error)});


        
    
        return Response.json("success")
    }catch(err){
        console.log(err);
        return new Response("Unauthorized", { status: 401 });

    }
     
}