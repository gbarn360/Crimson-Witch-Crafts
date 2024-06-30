import axios from "axios";
import Item, { CartItemI } from "./Interfaces";



export async function checkoutUser(cart: CartItemI[]) {
    let filteredCart = cart.map(item => ( {name:item.name,price:item.itemPrice,quantity:item.quantity,color:item.color}));
    try {
        const response = await axios.post("https://checkout-arreqrjsua-uc.a.run.app",filteredCart); 
        window.location = response.data.url;
        
    } catch (error) {
        console.error("Error checking out:", error);
    }
}
export async function getCheckoutInfo(session_id:string){
    try{
        const response = await axios.post("https://getCheckoutInfo-arreqrjsua-uc.a.run.app",{session_id:session_id});
        return response.data;
    }catch(error){
        console.log("error retreiving checkout info: ",error);
    }
}
export async function getAllItems() {
    try {
        const response = await axios.get("https://getitems-arreqrjsua-uc.a.run.app");
        return response.data;
    } catch (error) {
        console.error("Error fetching items:", error);
        return [];
    }
}

export async function getIndividualItem(id: string) {
    try {
        const response = await axios.get("https://getinditem-arreqrjsua-uc.a.run.app",{
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

    const response = await axios.post("https://additem-arreqrjsua-uc.a.run.app",item,{
        headers:{
           'Authorization': `Bearer ${token}`,
        }
    });
    
}

export async function deleteItem(deletedItems : Item[]){
    const token = sessionStorage.getItem("idToken");

    let ids = deletedItems.map(item => {return item.id});
    await axios.post("https://deleteitem-arreqrjsua-uc.a.run.app",ids,{
        headers:{
           'Authorization': `Bearer ${token}`,
        }
    });
}

export  async function updateItem(id:string,item:{name: string,category: string,price: number,image: string[],materials: string[],description: string,colorOptions?: string[]}){
    const token = sessionStorage.getItem("idToken");
    const response = await axios.post("https://updateitem-arreqrjsua-uc.a.run.app",{
        id:id,
        item:item,
    },{
        headers:{
           'Authorization': `Bearer ${token}`,
        }
    });
}

