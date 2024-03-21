
import Stripe from "stripe";


let key = "sk_test_51OwnIOJE8lHoR2TXxkw1OKubluVXFIAiy9gFSRhGR2sfFGTy0rNXMOZIaiRQmbfIaDhuPYwieSJbu3hcKXHQiQnq00TWhTJCXd"
const stripe = new Stripe(key,{
    apiVersion: "2023-10-16"
})


export async function GET(request:Request){
    
    const{searchParams} = new URL(request.url);

    const cart = searchParams.get('cart');
   
    const parsedCart = cart ? JSON.parse(Array.isArray(cart) ? cart[0] : cart) : null;


   const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: parsedCart.map((item: { name: any; price: number; quantity: any; })=>{
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
        success_url: "http://localhost:3000", //switch to environment variable
        cancel_url: "http://localhost:3000/cart" 
    })

    return Response.json({url: session.url})
    
}
