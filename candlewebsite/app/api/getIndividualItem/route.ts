import axios from "axios";

export async function GET(request:Request){
    
    const{searchParams} = new URL(request.url);
    const id = searchParams.get('id');
    
    let response = await axios.get(`http://localhost:4000/items/${id}`);

    return Response.json(response.data);
}
