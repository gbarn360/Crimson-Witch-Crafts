import axios from "axios";

export async function getAllItems() {
    
    try{
       let result = axios.get("http://localhost:4000/items").then(response =>{ return Object.values(response.data)});

    }
    catch(err) {
        console.log(err);
    }
}