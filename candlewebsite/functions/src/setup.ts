import { initializeApp } from "firebase/app";
import Stripe from "stripe";

const firebaseConfig = {
    apiKey: "AIzaSyD_yuNQgMee7pXM4tVFw1J8YWwpaG0kHFs",
    authDomain: "crimson-witch-crafts.firebaseapp.com",
    projectId: "crimson-witch-crafts",
    storageBucket: "crimson-witch-crafts.appspot.com",
    messagingSenderId: "769917033117",
    appId: "1:769917033117:web:155501b4d2824f7f771274",
    measurementId:"G-DDG69DH5EZ"
  };
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);


  
  const key = "sk_test_51OwnIOJE8lHoR2TXxkw1OKubluVXFIAiy9gFSRhGR2sfFGTy0rNXMOZIaiRQmbfIaDhuPYwieSJbu3hcKXHQiQnq00TWhTJCXd"
  export const stripe = new Stripe(key,{
      apiVersion: "2024-04-10"
  })
  