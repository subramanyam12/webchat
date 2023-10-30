import axios from "axios";
import React,{ useState,useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import Dateconvert from "./Dateconvert";
import Loading from "./Loading";

const Users = ({getproffromusers,setchatactive}) => {
  const [userlist, setuserlist] = useState([]);
  const [alluserss, setalluserss] = useState('')
 const [loading, setloading] = useState(true)


  const fetchprofrnds=(id)=>{
    return(
      axios.get(`https://sidduweb.pythonanywhere.com/userfriends/${id}`)
      .then(resp=>{
        setuserlist(resp.data)
        setalluserss(resp.data)
      })
    )
  }

  let localstore = JSON.parse(sessionStorage.getItem("profile"));
  let username = useSelector((state) => state.Profile.at(-1)?.prof);
  
  useEffect(()=>{
    (localstore?.id || username?.id) && fetchprofrnds(username?.id || localstore?.id )

    // let intervalId= setInterval(()=>fetchprofrnds(username?.id || localstore?.id ),2000)
    // return ()=>clearInterval(intervalId)
  
  },[localstore?.id])

  const searchmsg=(e)=>{
      let newsrch=alluserss.filter(msg=>msg.usertag.toLowerCase().includes(e.target.value.toLowerCase()))
      setuserlist(e.target.value ? newsrch : alluserss)
  }

  const userclickhandler=(user)=>{
    getproffromusers(user)
    setchatactive(true)
  }

  setTimeout(()=>setloading(false),1000)
  
  return (

    <div className='flex flex-col z-10 bg-[#ebeaeae7] w-[23vw] max-sm:w-full h-[55vh] max-sm:h-[77vh]'>
      <div className=" mb-3 flex items-center justify-between box-shadow  left-0 px-4 py-[2px] rounded-xl max-sm:mb-2 ">
       <img className=" w-[135px]" src='webchat.png' />
       <span className=" text-right text-lg max-sm:text-xl font-bold"> @{username ? username?.usertag : localstore?.usertag}</span>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex items-center px-3 max-sm:px-[14px]  gap-2 rounded-full bg-white box-shadow">
          <BsSearch className="text-sm max-sm:text-xl" />
          <input type="search" placeholder="search" onChange={searchmsg} className="py-[6px] rounded-full max-sm:py-[10px] max-sm:text-lg outline-none w-[95%]" />
        </div>

        <div className="flex overflow-y-auto user-scroll h-[48.5vh] max-sm:h-[64vh] flex-col gap-2">
         {loading ? <Loading color={'black'} size={'w-9 h-9'} />
         :(
          <>
          {userlist.length ? userlist?.map((user) => (
            <div
              key={user.user}
              onClick={()=>userclickhandler(user)}
              className="flex items-center justify-between p-2 py-[6px]  w-full rounded-xl bg-white box-shadow cursor-pointer max-sm:cursor-default"
            >
              <div className="flex gap-3">
                <div className="relative">
                <img
                  className="w-[45px] h-[45px] object-cover object-center rounded-full max-sm:w-[55px] max-sm:h-[55px] "
                  src={`https://sidduweb.pythonanywhere.com/${user?.profile_img}`}
                />
                {user?.online_status && <small className="w-[10px] h-[10px] rounded-full absolute max-sm:right-1 right-0 bottom-0 bg-green-500"></small>}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg">{user.usertag}</span>
                  <small className="text-xs max-sm:text-sm text-gray-500">
                    {`${user?.last_message?.substr(0,28)}${user?.last_message?.length> 28 ? '...':''}`}
                  </small>
                </div>
              </div>
              <div>
                <span className="text-xs max-sm:text-sm mr-3 text-gray-500">
                  {user?.msg_time && <Dateconvert currentDate={user?.msg_time} brk={<br />} />}
                </span>
              </div>
            </div>
          )):(
            <div className="w-full text-lg font-bold text-center">No Friends...</div>
          )}
          </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Users;
