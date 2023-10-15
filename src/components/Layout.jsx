import React,{useEffect} from "react";
import Navbar from "./Navbar";
import { Outlet,useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


const Layout = () => {
  const navigate=useNavigate()
  const [token, settoken, removetoken] = useCookies(["mytoken"]);
  useEffect(()=>{
      if(JSON.stringify(sessionStorage.getItem('profile'))==='null'){
      removetoken(["mytoken"]);
      navigate('/')
      }
      
  },[])

  return (
    <div className={`shadow-2xl overflow-hidden font-serif p-5 max-sm:p-3 flex max-sm:flex-col ${!token['mytoken'] && 'items-center'} max-sm:w-[100vw] max-sm:h-[99vh] gap-5 bg-[#ffffffe7]`}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
