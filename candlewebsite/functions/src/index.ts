
import {onRequest} from "firebase-functions/v2/https";
import Stripe from "stripe";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc} from 'firebase/firestore';
import {app} from "./setup"
import { getAuth } from "firebase-admin/auth";
import { getApps, initializeApp } from "firebase-admin/app";
import { credential } from "firebase-admin";

if (!getApps().length) {
    const serviceAccount = require("../firebasesdk.json"); // Path to your service account key
  
    initializeApp({
      credential: credential.cert(serviceAccount),
    });
  }
  
  
  

  const db = getFirestore(app);


interface Item {
    id:string,
    name: string,
    category: string,
    price: number,
    image: string[],
    materials: string[],
    description: string,
    colorOptions?: string[]
}


const key = "sk_test_51OwnIOJE8lHoR2TXxkw1OKubluVXFIAiy9gFSRhGR2sfFGTy0rNXMOZIaiRQmbfIaDhuPYwieSJbu3hcKXHQiQnq00TWhTJCXd"
const stripe = new Stripe(key,{
    apiVersion: "2023-10-16"
})



export const getItems = onRequest(async(request:any,response:any)=>{


    const querySnapshot = await getDocs(collection(db, "items"));

    const items: Item[] = [];
    querySnapshot.forEach((doc) => {
        
       let itemData = doc.data() as Item;
       itemData.id = doc.id;
        items.push(itemData);
    });

    return response.json(items);

})

export const checkout = onRequest(async(request:any, response:any) => {


    let data = request.body;
    const session = await stripe.checkout.sessions.create({
         payment_method_types: ['card'],
         tax_id_collection : {'enabled' : true},
         billing_address_collection: 'required',
         line_items: data.map((item: { name: any; price: number; quantity: any; })=>{
             return{
                 price_data:{
                     currency:'usd',
                     product_data: {
                         name:item.name
                     }, 
                     unit_amount : item.price * 100 //price in cents
                 },
                 quantity: item.quantity
             }
         }),
         mode: 'payment',
         success_url: `http://127.0.0.1:5000/OrderSuccess`,
         cancel_url: `http://127.0.0.1:5000/Cart` 
     })
     return response.json({url:session.url})
     
});

export const addItem = onRequest(async(request:any, response:any) => {
    const Authorization = request.headers.authorization;
    const item = request.body;
    
    if (!Authorization) {
        return response.status(401).json("Unauthorized");
    }

    const token = Authorization.split(" ")[1];

    try {
        await getAuth().verifyIdToken(token);
        const docRef = doc(collection(db, 'items'));

        await setDoc(docRef, {
            name: item.name,
            category: item.category,
            image: item.image,
            price: item.price,
            description: item.description,
            materials: item.materials,
            colorOptions: item.colorOptions || [] 
        });

        return response.json("success");
    } catch(err) {
        console.log(err);
        return response.status(401).json("Unauthorized");
    }
});

export const deleteItem = onRequest(async(request:any, response:any) => {
    const Authorization = request.headers.authorization;
    const data = request.body;
    
    if (!Authorization) {
        return new Response("Unauthorized", { status: 401 });
    }

    const token = Authorization.split(" ")[1];

    try {
        await getAuth().verifyIdToken(token);
        await Promise.all(data.map(async(id:string) => {
            const docRef = doc(db, 'items', id);
            await deleteDoc(docRef);
        }));
        return response.json("success");
    }catch(err){
        console.log(err);
        return new response("Unauthorized", { status: 401 });

    }
     
});

export const updateItem = onRequest(async(request:any, response:any) => {

    const Authorization = request.headers.authorization
    const {id,item} = request.body;


    if (!Authorization) {
        return new response("Unauthorized", { status: 401 });
      }

    const token = Authorization.split(" ")[1];
    try{
        
        await getAuth().verifyIdToken(token);
        
          const docRef = doc(db, 'items',id);

          await setDoc(docRef, {
            name: item.name,
            category: item.category,
            image: item.image,
            price:item.price,
            description: item.description,
            materials: item.materials,
            colorOptions: item.colorOptions || [] 
        });
      
        return response.json("success")
    }catch(err){
        console.log(err);
        return new response("Unauthorized", { status: 401 });

    }
     
});

