import React from 'react';
import { useState } from 'react';
import toast from "react-hot-toast";
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [loading,setloading] = useState(false);
    const {setAuthUser} = useAuthContext()

    const signup = async({fullName, username,email, password, confirmPassword,gender,profilePicture}) => {
       const success = handleInputErrors({fullName, username,email, password, confirmPassword,gender});
       if(!success) return;

       if(profilePicture && profilePicture.size > 4 * 1024 * 1024){
        toast.error("Uploaded profile picture exceeds 5MB.")
        return true;
       }


        setloading(true);
       try{
        const res =await fetch("/api/auth/signup",{
            method: "POST",
            headers:{"Content-type": "application/json"},
            body: JSON.stringify({fullName, username,email, password, confirmPassword, gender,profilePicture}),
        } );

        const data =await res.json();
        if(data.error){
            throw new Error(data.error)
        }

        localStorage.setItem("chat-user", JSON.stringify(data));
         
        setAuthUser(data);

        // console.log(data);

       } catch(error){
        toast.error(error.message);
       }finally{
        setloading(false);
       }

    };

    return {loading, signup};
};

export default useSignup;



function handleInputErrors({fullName, username,email, password, confirmPassword,gender}){
    if(!fullName || !username || !email || !password || !confirmPassword || !gender) {
        toast.error("Some fields are missing 🥺");
        return false;
    }

    if(password !== confirmPassword){
        toast.error("Password not matching😒");
        return false;
    }

    
    
    if(password.length<8){
        toast.error("Password length should be a minimum of 8 character⚔️ ");
        return false;
    }

    return true;
}
