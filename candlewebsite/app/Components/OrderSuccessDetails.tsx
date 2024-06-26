'use client'


import { useEffect,useState } from "react"
import { clearCart } from "../State/Cart/CartSlice"
import { useDispatch } from "react-redux"
import { getCheckoutInfo } from "../services"

interface PaymentDetails{
    address:{
        city:string,
        country:string,
        line1:string,
        postal_code:string,
        state:string,
    },
    email:string,
    name:string,
    phone:string,
}

export default function OrderSuccessDetails(){

    const dispatch = useDispatch();
    const [orderDetails,setOrderDetails] = useState([]);
    const [paymentDetails,setPaymentDetails] = useState<PaymentDetails | null>(null);
    const [totalCost,setTotalCost] = useState(0);

    
    useEffect(() => {
        dispatch(clearCart())
        const url = new URL(window.location.href);
        const urlParams = new URLSearchParams(url.search);
        const sessionId = urlParams.get('session_id')
        if(sessionId){
            const getOrderDetails = async()=>{
               let order = await getCheckoutInfo(sessionId)
               setOrderDetails(order.lineItems.data);
               setPaymentDetails(order.session.customer_details);
                getTotalCost(order.lineItems.data);
                console.log(order.session)
            };
            getOrderDetails();

        } 
    },[])

    function getTotalCost(items: any[]) {
        let totalCost = 0;
        for(let i = 0;i<items.length;i++){
            totalCost += items[i].quantity *(items[i].price.unit_amount / 100)
        }
        setTotalCost(totalCost);
    }
    
    return(
        <div className="flex flex-col w-5/6 m-auto">
            <h1 className="m-auto mt-20 h-2/3 font-bold text-3xl">Your order was placed!</h1>
            <div className="flex  justify-between">
                <div className=" w-1/2">
                    <h2><b>Order Summary</b></h2>
                    <div className="flex justify-between border-b-2 border-black ">
                        <h2>Product Name</h2>
                        <h2>Price</h2>
                        <h2>Qty</h2>
                        <h2>Subtotal</h2>
                    </div>
                    {orderDetails && orderDetails.map((item:any,index)=>(
                        <div key={index} className="flex justify-between">
                            <h1 className=" ">{item.description}</h1>
                            <h1 className=" ">{item.price.unit_amount / 100}</h1>
                            <h1 className="">{item.quantity}</h1>
                            <h1 className="">{item.quantity *(item.price.unit_amount / 100)}</h1>
                        </div>
                    ))}
                    <div className="flex">
                        <h1 className=" w-fit mr-2"><b>Total</b> </h1>
                        <h1 className=" w-fit">{totalCost}</h1>
                    </div>

                </div>
                <div className="w-1/3">
                    <h2><b>Payment Summary</b></h2>
                    <div className="flex justify-between border-b-2 border-black ">
                        <h2>Shipping Address</h2>
                        <h2>Payment Address</h2>
                        
                    </div>
                    <div className="flex justify-between">
                    {paymentDetails &&
                     <div>
                        <h1>{paymentDetails.name}</h1>
                        <h1>{paymentDetails.address.line1}</h1>
                        <h1>{paymentDetails.address.city}</h1>
                        <h1>{paymentDetails.address.state}</h1>
                        <h1>{paymentDetails.address.postal_code}</h1>

                    </div>
                    }
                    {paymentDetails &&
                     <div>
                        <h1>{paymentDetails.name}</h1>
                        <h1>{paymentDetails.address.line1}</h1>
                        <h1>{paymentDetails.address.city}</h1>
                        <h1>{paymentDetails.address.state}</h1>
                        <h1>{paymentDetails.address.postal_code}</h1>

                    </div>
                    }
                    </div>
                    
                    
                </div>
            </div>
        </div>

    )
}