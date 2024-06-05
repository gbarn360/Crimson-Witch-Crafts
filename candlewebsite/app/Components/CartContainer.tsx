import { Provider } from "react-redux";
import { store } from "../State/state";
import Navbar from "../Components/Navbar"
import CartContent from "../Components/CartContent";
import Footer from "../Components/Footer";


export default function CartContainer(){
    return (
        <Provider store={store} >
          
        <Navbar />
        <CartContent />
        <Footer />

    </Provider>
    )
}