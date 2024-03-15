'use client'
import {store} from "./State/state"
import { Provider } from 'react-redux';
import Navbar from "./Components/Navbar";
import ContentContainer from "./Components/ContentContainer";
export default function page() {

    return (
        <Provider store={store}>
            <Navbar />
            <ContentContainer />
        </Provider>
    )
}