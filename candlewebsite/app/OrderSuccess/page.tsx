'use client'
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import OrderSuccessDetails from "../Components/OrderSuccessDetails";
import {store} from "../State/state";
import { Provider } from 'react-redux';



export default function OrderSuccess(){


    return(
        <Provider store={store}>
            <div className="h-screen flex flex-col justify-between">
                <Navbar />
                <OrderSuccessDetails />
                <Footer />
            </div>
        </Provider>
        
    )
}