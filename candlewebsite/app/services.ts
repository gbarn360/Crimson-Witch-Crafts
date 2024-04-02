import axios from "axios";
import { CartItemI } from "./Interfaces";
import { AdminLogin } from "./Interfaces";



export async function checkoutUser(cart: CartItemI[]) {
    try {
        const response = await axios.get("/api/checkout",{
            params:{
                cart:JSON.stringify(cart),
            }
        }); 
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

export async function signInAdmin(name: string, password: string) {
    let response = {login:true}
    return new Promise<AdminLogin>((resolve) => {
        setTimeout(() => {
            resolve(response);
        }, 2000);
    });
}

export async function addItem(item:{name: string,category: string,price: number,image: string[],materials: string[],description: string,colorOptions?: string[]}){


    const response = await axios.post("/api/addItem",item);
    
}


