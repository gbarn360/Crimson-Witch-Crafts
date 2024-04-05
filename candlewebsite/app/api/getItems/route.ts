import { getFirestore, collection, getDocs} from 'firebase/firestore';
import { app } from "../Firebase/setup";
import Item from "../../Interfaces/index";



const db = getFirestore(app);

export async function GET(request: Request) {
    const querySnapshot = await getDocs(collection(db, "items"));

    const items: Item[] = [];
    querySnapshot.forEach((doc) => {
        
       let itemData = doc.data() as Item;
       itemData.id = doc.id;
        items.push(itemData);
    });

    return Response.json(items);
}