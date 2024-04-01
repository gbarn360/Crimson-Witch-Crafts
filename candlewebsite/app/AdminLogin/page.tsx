'use client'
import { signInAdmin } from "../services"
import {useState} from "react"
import Loading from "../Components/Loading";

export default function AdminLogin(){

    const[userID,setUserID] = useState("");
    const [error,setError] = useState("");

    const[password,setPassword] = useState("");

    const [waiting,setWaiting] = useState(false);

    async function signIn(){
        if(userID.length && password.length){
            setWaiting(true);
            let response = await signInAdmin(userID,password)
            setWaiting(false);
            //check response and update error message if required or redirect admin to dashboard
            
            response.errorMessage ? setError(response.errorMessage) : window.location.href = "/AdminDashboard"

            setUserID("");
            setPassword("");
        }
        else{
            setError("input field(s) empty");
        }
    }

    return(
        <div className="flex h-screen justify-center items-center">
            {waiting ? <Loading /> :<div className="m-auto relative  p-2 border-2 border-customRed flex flex-col items-center ">
                <h1 className="font-bold text-3xl "><button onClick={()=>window.location.href = "/"} className="text-xs absolute left-1 text-gray-400">back</button>Login </h1>
                <form onSubmit={(e)=>{e.preventDefault();signIn()}} className="flex flex-col gap-2 mt-5 items-center">
                    <input type="text" className="border-2 w-2/3" placeholder="UserName" onChange={(e)=>setUserID(e.target.value)}/>
                    <input type="password" className="border-2 w-2/3" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                    <button className="border-2 px-2 py-1">Submit</button>
                    <h1 className="text-customRed">{error}</h1>
                </form>
            </div>
            }
        </div>
    )
}