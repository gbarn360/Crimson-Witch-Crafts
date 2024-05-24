
import Stripe from "stripe";


const stripe = new Stripe(String(process.env.STRIPE_API_KEY),{
    apiVersion: "2023-10-16"
})


export async function POST(request:Request){
    
    const data = await request.json();

   const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        tax_id_collection : {'enabled' : true},
        billing_address_collection: 'required',
        line_items: data.map((item: { name: any; price: number; quantity: any; })=>{
            return{
                price_data:{
                    currency:'usd',
                    product_data: {
                        name:item.name
                    }, 
                    unit_amount : item.price * 100 //price in cents
                },
                quantity: item.quantity
            }
        }),
        mode: 'payment',
        success_url: `${process.env.URL}/OrderSuccess`,
        cancel_url: `${process.env.URL}/Cart` 
    })
    return Response.json({url:session.url})
    
}
