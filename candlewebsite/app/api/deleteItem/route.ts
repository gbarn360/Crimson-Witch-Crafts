
import { getFirestore,doc,deleteDoc} from 'firebase/firestore';
import { app } from "../Firebase/setup";
import { getAuth } from "firebase-admin/auth"; 
import { credential, initializeApp } from 'firebase-admin';
import { getApps } from 'firebase/app';

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
            
                await Promise.all(data.map(async(id:string)=>{
                    const docRef = doc(db, 'items',id);
                    await deleteDoc(docRef);
                }))
                
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