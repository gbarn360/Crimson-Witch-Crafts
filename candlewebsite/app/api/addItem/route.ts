


export async function GET(request:Request){

    
    const {searchParams} = new URL(request.url);
    console.log(searchParams);
    const item = searchParams.get('item');
    const parsedItem = item ? JSON.parse(item) : null;
   
    
    return Response.json({status:200})
}