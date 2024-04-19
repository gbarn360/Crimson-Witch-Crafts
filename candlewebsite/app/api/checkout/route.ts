
import Stripe from "stripe";


let key = "sk_test_51OwnIOJE8lHoR2TXxkw1OKubluVXFIAiy9gFSRhGR2sfFGTy0rNXMOZIaiRQmbfIaDhuPYwieSJbu3hcKXHQiQnq00TWhTJCXd"
const stripe = new Stripe(key,{
    apiVersion: "2023-10-16"
})


export async function POST(request:Request){
    
    const data = await request.json();


   const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        tax_id_collection : {'enabled' : true},
        billing_address_collection: 'required',
        line_items: data.map((item: { name: any; itemPrice: number; quantity: any; })=>{
            return{
                price_data:{
                    currency:'usd',
                    product_data: {
                        name:item.name
                    }, 
                    unit_amount : item.itemPrice * 100 //price in cents
                },
                quantity: item.quantity
            }
        }),
        mode: 'payment',
        success_url: "http://localhost:3000/OrderSuccess", //switch to environment variable
        cancel_url: "http://localhost:3000/Cart" 
    })
    return Response.json({url:session.url})
    
}
