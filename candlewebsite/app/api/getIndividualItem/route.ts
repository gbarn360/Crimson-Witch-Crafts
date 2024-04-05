import { getFirestore, collection, getDocs,getDoc, doc} from 'firebase/firestore';
import { app } from "../Firebase/setup";
import Item from "../../Interfaces/index";

const db = getFirestore(app);

export async function GET(request: Request) {

    const{searchParams} = new URL(request.url);
    const id = searchParams.get('id');

    const itemDocRef = doc(db,`items/${id}`)
    const itemDocSnapshot = await getDoc(itemDocRef);

    if (itemDocSnapshot.exists()) {
        const itemData = itemDocSnapshot.data() as Item;
        return Response.json(itemData);
    } else {
        return Response.json({ status:404,error: 'Item not found.' });
    }
}