import { getFirestore, collection, getDocs,getDoc, doc} from 'firebase/firestore';
import { app } from "../Firebase/setup";
import Item from "../../Interfaces/index";

const db = getFirestore(app);

// export async function generateStaticParams() {
//     const querySnapshot = await getDocs(collection(db, "items"));

//     const items: Item[] = [];
//     querySnapshot.forEach((doc) => {
        
//        let itemData = doc.data() as Item;
//        itemData.id = doc.id;
//         items.push(itemData);
//     });

//    return items.map((item:Item)=> ({
//   params: {
//             id: item.id,
//         },    
//    }))
// }


export async function GET(request: Request) {

    const id = request.headers.get('id');

    console.log(id);
    
    // const itemDocRef = doc(db,`items/${params.id}`)
    // const itemDocSnapshot = await getDoc(itemDocRef);

    // if (itemDocSnapshot.exists()) {
    //     const itemData = itemDocSnapshot.data() as Item;
    //     return Response.json(itemData);
    // } else {
    //     return Response.json({ status:404,error: 'Item not found.' });
    // }


         return Response.json({ status:404,error: 'Item not found.' });

}