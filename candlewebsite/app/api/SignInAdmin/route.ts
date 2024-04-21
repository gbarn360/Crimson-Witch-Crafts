import { getFirestore, collection,doc,getDoc} from 'firebase/firestore';
import { app } from "../Firebase/setup";


const db = getFirestore(app);

export async function GET(request:Request){

    const{searchParams} = new URL(request.url);
    const name = searchParams.get('name');
    const password = searchParams.get('password');

    const adminDocRef = doc(db,'Admin/1')
    const adminDoc = await getDoc(adminDocRef);
    const data = adminDoc.data()
    if(data){
        if(data.Username !== name ){
            return Response.json({login:false,errorMessage:"Invalid username"})
        }
        else if(data.Password !== password){
            return Response.json({login:false,errorMessage:"Invalid password"})
        }
        else{
            return Response.json({login:true,errorMessage:""})
        }
    
    }
   
}