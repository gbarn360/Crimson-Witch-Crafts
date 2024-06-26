
import {onRequest} from "firebase-functions/v2/https";
import { getFirestore, collection, getDocs, doc, setDoc,getDoc, deleteDoc} from 'firebase/firestore';
import {app} from "./setup"
import { getAuth } from "firebase-admin/auth";
import { getApps, initializeApp } from "firebase-admin/app";
import { credential } from "firebase-admin";
import { stripe } from "./setup";
const cors = require('cors')({ origin: true });


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




export const getIndItem = onRequest(async(request:any,response:any)=>{

    cors(request, response, async() => {

    const id = request.headers.id;

        try{
            const docRef = doc(db,"items",id);

            const item = (await getDoc(docRef)).data() as Item;
            item.id = id;
            return response.json({item:item});
        }catch(error){
            console.log("error fetching ind item: " + error);
        }
    });
})



export const getItems = onRequest(async(request:any,response:any)=>{

    cors(request, response, async() => {
        const querySnapshot = await getDocs(collection(db, "items"));

        const items: Item[] = [];
        querySnapshot.forEach((doc) => {
            
           let itemData = doc.data() as Item;
           itemData.id = doc.id;
            items.push(itemData);
        });
    
        return response.json(items);
    });

  

})

export const checkout = onRequest(async(request:any, response:any) => {

    cors(request, response, async() => {


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
            success_url: `https://crimson-witch-crafts.web.app/OrderSuccess?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `https://crimson-witch-crafts.web.app/Cart` 
        })
        return response.json({session:session,url:session.url})
    });
     
});

export const getCheckoutInfo = onRequest(async(request:any, response:any) => {

    cors(request, response, async() => {

        const {session_id} = request.body;

        const session = await stripe.checkout.sessions.retrieve(String(session_id));
        const lineItems = await stripe.checkout.sessions.listLineItems(String(session_id));
        
       

        return response.json({session:session,lineItems:lineItems});

    });
});

export const addItem = onRequest(async(request:any, response:any) => {

    cors(request, response, async() => {

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
});

export const deleteItem = onRequest(async(request:any, response:any) => {

    cors(request, response, async() => {

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
     
});

export const updateItem = onRequest(async(request:any, response:any) => {

    cors(request, response, async() => {


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
     
});

