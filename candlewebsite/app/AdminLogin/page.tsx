'use client'
import {useState,useEffect} from "react"
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { app } from "../api/Firebase/setup";

import Loading from "../Components/Loading";

export default function AdminLogin(){

    const[userID,setUserID] = useState("");
    const[password,setPassword] = useState("");
    const[showPassword,setShowPassword] = useState("password");
    const [error,setError] = useState("");
    const [waiting,setWaiting] = useState(false);

    useEffect(()=>{
        if(sessionStorage.getItem("idToken")){
            window.location.href=`/AdminDashboard`;
        }

       
    },[])


    function signIn(){
        if(userID.length && password.length){
            setWaiting(true);


            const auth = getAuth(app);

            signInWithEmailAndPassword(auth, userID, password)
            .then(async (userCredential: any) => {
            // User is logged in
            const user = userCredential.user;
        
            const token = await user.getIdToken();
            sessionStorage.setItem("idToken",token);

            window.location.href = "/AdminDashboard"

            })
            .catch((error:any) => {
            // Handle errors
            setError("Invalid email or password")
        
            });
          
            setWaiting(false);
        
        }
        else{
            setError("input field(s) empty");
        }
    }

    return(
        <div className="flex h-screen justify-center items-center">
            {waiting ? <div className="mt-60"> <Loading /> </div> :<div className="m-auto relative  p-2 border-2 border-customRed flex flex-col items-center ">
                <h1 className="font-bold text-3xl "><button onClick={()=>window.location.href = "/"} className="text-xs absolute left-1 text-gray-400">back</button>Login </h1>

                <form onSubmit={(e)=>{e.preventDefault();signIn()}} className="flex flex-col gap-2 mt-5">
                    <input type="text" className="border-2 w-3/4" placeholder="UserName" onChange={(e)=>setUserID(e.target.value)}/>
                    <div className="">
                        <input type={showPassword} className="border-2 w-3/4" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                        <button className="ml-2" onClick={(e)=> {e.preventDefault();showPassword === "password" ? setShowPassword("text") : setShowPassword("password")}}>show</button>
                    </div>
                    <div className="relative flex flex-col items-center w-full">
                        <button className="border-2 px-2 py-1">login</button>
                        {/* <button onClick={(e)=>resetCredentials(e)} className="absolute right-0 text-xs  text-gray-400">reset</button> */}
                        <h1 className="text-customRed">{error}</h1>
                    </div>
                    
                </form>
            </div>
            }
        </div>
    )
}