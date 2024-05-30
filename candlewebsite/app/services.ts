import axios from "axios";
import Item, { CartItemI } from "./Interfaces";



export async function checkoutUser(cart: CartItemI[]) {
    
    let filteredCart = cart.map(item => ( {name:item.name,price:item.itemPrice,quantity:item.quantity}));
    try {
        const response = await axios.post("http://127.0.0.1:5001/crimson-witch-crafts/us-central1/checkout",filteredCart); 
        window.location = response.data.url;
        
    } catch (error) {
        console.error("Error checking out:", error);
    }
}
export async function getAllItems() {
    try {
        const response = await axios.get("http://127.0.0.1:5001/crimson-witch-crafts/us-central1/getItems"); 
        return response.data;
    } catch (error) {
        console.error("Error fetching items:", error);
        return [];
    }
}

export async function getIndividualItem(id: string) {
    try {
        const response = await axios.get("http://127.0.0.1:5001/crimson-witch-crafts/us-central1/getIndItem",{
            headers:{
               "id":`${id}`
            }
        }); 
        return response.data;
    } catch (error) {
        console.error("Error fetching item:", error);
        return [];
    }
}


export async function addItem(item:{name: string,category: string,price: number,image: string[],materials: string[],description: string,colorOptions?: string[]}){
    const token = sessionStorage.getItem("idToken");

    const response = await axios.post("http://127.0.0.1:5001/crimson-witch-crafts/us-central1/addItem",item,{
        headers:{
           'Authorization': `Bearer ${token}`,
        }
    });
    
}

export async function deleteItem(deletedItems : Item[]){
    const token = sessionStorage.getItem("idToken");

    let ids = deletedItems.map(item => {return item.id});
    await axios.post("http://127.0.0.1:5001/crimson-witch-crafts/us-central1/deleteItem",ids,{
        headers:{
           'Authorization': `Bearer ${token}`,
        }
    });
}

export  async function updateItem(id:string,item:{name: string,category: string,price: number,image: string[],materials: string[],description: string,colorOptions?: string[]}){
    const token = sessionStorage.getItem("idToken");
    const response = await axios.post("http://127.0.0.1:5001/crimson-witch-crafts/us-central1/updateItem",{
        id:id,
        item:item,
    },{
        headers:{
           'Authorization': `Bearer ${token}`,
        }
    });
}

