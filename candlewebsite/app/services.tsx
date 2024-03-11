import axios from "axios";

let baseUrl = "http://localhost:4000"

export async function getAllItems() {
    let response = await axios.get(`${baseUrl}/items`)
    return response.data;
}

export async function getIndividualItem(id:number){
    let response = await axios.get(`${baseUrl}/items/${id}`);
    return response.data;

}