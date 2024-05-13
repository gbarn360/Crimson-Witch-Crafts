import axios from "axios";
import Item, { CartItemI } from "./Interfaces";



export async function checkoutUser(cart: CartItemI[]) {
    try {
        const response = await axios.post("/api/checkout",cart); 
        window.location = response.data.url;
    } catch (error) {
        console.error("Error checking out:", error);
    }
}
export async function getAllItems() {
    try {
        const response = await axios.get("/api/getItems"); 
        return response.data;
    } catch (error) {
        console.error("Error fetching items:", error);
        return [];
    }
}

export async function getIndividualItem(id: number) {
    try {
        const response = await axios.get("/api/getIndividualItem",{
            params:{
                id:id
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

    const response = await axios.post("/api/addItem",item,{
        headers:{
           'Authorization': `Bearer ${token}`,
        }
    });
    
}

export async function deleteItem(deletedItems : Item[]){
    const token = sessionStorage.getItem("idToken");

    let ids = deletedItems.map(item => {return item.id});
    await axios.post("/api/deleteItem",ids,{
        headers:{
           'Authorization': `Bearer ${token}`,
        }
    });
}

export  async function updateItem(id:string,item:{name: string,category: string,price: number,image: string[],materials: string[],description: string,colorOptions?: string[]}){
    const token = sessionStorage.getItem("idToken");
    const response = await axios.post("/api/updateItem",{
        id:id,
        item:item,
    },{
        headers:{
           'Authorization': `Bearer ${token}`,
        }
    });
}

