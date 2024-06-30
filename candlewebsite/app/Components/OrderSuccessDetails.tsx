'use client'


import { useEffect,useState } from "react"
import { clearCart } from "../State/Cart/CartSlice"
import { useDispatch } from "react-redux"
import { getCheckoutInfo } from "../services"
import Loading from "./Loading"

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
    const [loadingContent,setLoadingContent] = useState(true);
    
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
                setLoadingContent(false);
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
        <div>
            {!loadingContent ? <div className="flex flex-col w-5/6 m-auto 2xl:w-2/3">
            <h1 className="m-auto my-20 h-2/3 font-bold text-3xl">Your order was placed!</h1>
            <div className=" flex  flex-col items-center md:items-start  md:justify-between md:flex-row ">
                <div className="w-full mb-20 md:mb-0 md:w-1/2 h-full">
                    <h2 className="mb-2 text-center md:text-left"><b>Order Summary</b></h2>
                    <div className="grid grid-cols-4 border-b-2 border-black mb-2">
                        <h2>Product Name</h2>
                        <h2>Price</h2>
                        <h2>Qty</h2>
                        <h2>Subtotal</h2>
                    </div>
                    {orderDetails && orderDetails.map((item:any,index)=>(
                        <div key={index} className="grid grid-cols-4 border-b-2 my-2 ">
                            <h1 className="">{item.description}</h1>
                            <h1 className="">${(item.price.unit_amount / 100).toFixed(2)}</h1>
                            <h1 className="">{item.quantity}</h1>
                            <h1 className="">${(item.quantity *(item.price.unit_amount / 100)).toFixed(2)}</h1>
                        </div>
                    ))}
                    <div className="flex">
                        <h1 className=" w-fit mr-2"><b>Total</b> </h1>
                        <h1 className=" w-fit">${totalCost.toFixed(2)}</h1>
                    </div>

                </div>
                <div className="w-full md:w-1/3">
                    <h2 className="mb-2 text-center md:text-left"><b>Payment Summary</b></h2>
                    <div className="flex justify-between border-b-2 border-black mb-2">
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
            <button onClick={()=>window.location.href="/"} className="mt-20 border-2 w-fit m-auto p-2 rounded-md hover:bg-customRed hover:text-white hover:border-transparent hover:transition-colors">Continue Shopping</button>
                        
        </div>
 : <Loading />}
        </div>
         
    )
}