import axios from "axios";
import { CartItemI } from "./Interfaces";

// Assuming you have dotenv and Stripe setup correctly
// Make sure to import Stripe from the correct package location

export async function checkoutUser(cart: CartItemI[]) {
    try {
        console.log(cart);
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

