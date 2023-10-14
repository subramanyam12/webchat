import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import {useNavigate} from 'react-router-dom'

const Settings = () => {
  const [token, settoken, removetoken] = useCookies(["mytoken"]);
  let userid = JSON.parse(localStorage.getItem("profile"));
  let navigate = useNavigate()
  const del_request=()=>{
    return (
        axios.post(`https://sidduweb.pythonanywhere.com/delete_user/${userid?.user}`)
        .then(resp=>{
            removetoken(['mytoken'])
            navigate('/')
            localStorage.removeItem('profile')
        })  
    )
  }


   return (
    <div className="flex flex-col gap-3 w-[23vw] max-sm:w-full max-sm:h-full bg-gray-200 box-shadow rounded-xl">
      <div className="flex justify-between  mb-3 py-1 left-0 px-4 rounded-xl max-sm:mb-2 text-xl bg-white box-shadow font-bold">
        <span>Settings</span>
        <span className="font-bold text-lg">@{userid?.usertag}</span>
      </div>
       <div className="relative p-2">
        <h1 className="font-bold">If you want delete your account:</h1>
         <p className="ml-4 py-2">- it would delete from database.</p>
       <button onClick={del_request} className="bg-red-500 shadow shadow-gray-500 duration-200 active:shadow-none absolute right-[10%] py-1 px-4 max-sm:px-5 rounded-lg font-bold text-white">Delete</button>
       </div>
    </div>
      
  );
};

export default Settings;
 
