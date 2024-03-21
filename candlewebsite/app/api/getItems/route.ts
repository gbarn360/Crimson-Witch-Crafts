import axios from "axios";

export async function GET(request:Request){
    let response = await axios.get("http://localhost:4000/items");

    return Response.json(response.data);
}
