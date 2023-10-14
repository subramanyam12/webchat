import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";


const Layout = () => {
  const [token] = useCookies(["mytoken"]);

  return (
    <div className={`shadow-2xl overflow-hidden font-serif p-5 max-sm:p-3 flex max-sm:flex-col ${!token['mytoken'] && 'items-center'} max-sm:w-[100vw] max-sm:h-[99vh] gap-5 bg-[#ffffffe7]`}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
