import React, { useState, useEffect, useRef } from "react";
import { BiHomeCircle, BiSolidHomeCircle } from "react-icons/bi";
import { AiOutlineSetting, AiFillSetting } from "react-icons/ai";
import { FaSignOutAlt, FaUserFriends } from "react-icons/fa";
import { LiaUserFriendsSolid } from "react-icons/lia";
import {MdOutlineNotificationsActive,MdNotificationsActive,} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import axios from "axios";

const Navbar = () => {
  const navlist = ["home", "friends", "notifications", "settings",'profile'];
  let linkid=window.location.hash.split('/')
  const [active, setactive] = useState(navlist.indexOf(linkid[1])!==-1 ? navlist.indexOf(linkid[1]) :null);
  const [token, settoken, removetoken] = useCookies(["mytoken"]);
  const navigate = useNavigate();
  const userprofile = useSelector((state) => state.Profile);
  const profileimg = useRef();
  
  let sessionstore=JSON.parse(sessionStorage.getItem("profile"))
  let currentimg = sessionstore?.profile_img;
  useEffect(() => {
    
    if (!token["mytoken"]) {
      navigate("/");
    }
    setactive(navlist.indexOf(linkid[1])!==-1 ? navlist.indexOf(linkid[1]) :null)
    if (currentimg) {
      profileimg.current.src = currentimg;
    }else{
      profileimg.current.src = 'unknown.png';
    }
  }, [token, currentimg,active]);

  const icons = [
    [BiHomeCircle, BiSolidHomeCircle],
    [LiaUserFriendsSolid, FaUserFriends],
    [MdOutlineNotificationsActive, MdNotificationsActive],
    [AiOutlineSetting, AiFillSetting],
  ];

  const signout = () => {
    axios.post(`https://sidduweb.pythonanywhere.com/remove_status/${sessionstore?.id}`)
    removetoken(["mytoken"]);
    sessionStorage.removeItem("profile");
    setactive(0)
  };

  return (
    <nav className={` flex flex-col max-sm:flex-row max-sm:w-full max-sm:py-2 max-sm:h-auto w-[60px] h-[65vh] py-4 rounded-xl text-xl text-white justify-between items-center bg-gradient-to-b from-violet-700 to-violet-600`}>
      <div className="flex flex-col  max-sm:flex-row gap-[2vh] max-sm:gap-0 max-sm:w-full max-sm:justify-evenly items-center cursor-pointer max-sm:cursor-default">
        <Link to={token["mytoken"] && "/profile"} className="w-10 max-sm:w-12">
          <img
            ref={profileimg}
            onClick={()=>setactive(4)}
            className={`rounded-full aspect-square object-cover w-full h-full object-center ${
              active === 4 && "outline-white outline-[1px]  outline-double"
            } w-full`}
            src="unknown.png"
            alt=""
          />
        </Link>
        {icons.map(([Outline, Fill], id) => (
          <Link
            to={token["mytoken"] && navlist[id]}
            key={id}
            onClick={() => setactive(id)}
            className={` w-full max-sm:w-12 aspect-square duration-200 flex text-xl max-sm:text-2xl items-center  justify-center rounded-full ${
              active === id && "text-2xl shadow-[#1f122063] shadow-inner bg-[#761a8f63]"
            }`}
          >
            {active !== id ? <Outline /> : <Fill />}
          </Link>
        ))}
      </div>
      <div
        onClick={signout}
        className="cursor-pointer max-sm:cursor-default max-sm:pr-[5vw]"
      >
        <FaSignOutAlt />
      </div>
    </nav>
  );
};

export default Navbar;
