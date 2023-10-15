import React, { useEffect, useState} from "react";
import axios from "axios";

const Friends = () => {
 const [confirmbool, setconfirmbool] = useState({})
 const [delbool, setdelbool] = useState({})
 const [notifications, setnotifications] = useState([]);
 let userid = JSON.parse(sessionStorage.getItem("profile"));
  

 const fetchreceivedrequest = () => {
   return (
    axios.get(`https://sidduweb.pythonanywhere.com/friendrequestreceive/${userid?.id}`)
    .then(res=>{
     setnotifications(res.data)
      res.data.forEach(item=>{
      let userid=item.user
      setconfirmbool(prev=>({...prev,[userid]:true}))
       setdelbool(prev=>({...prev,[userid]:true}))
      })
    })
   )
 };

 useEffect(() => {
      fetchreceivedrequest()
     const intervalId= setInterval(fetchreceivedrequest,2000)
     return ()=>clearInterval(intervalId)
 }, [userid?.id]);


  const notifyconfirmfetch=async (sender,receiver,name)=>{
    const formdata=new FormData()
   
    formdata.append('sender',sender)
    formdata.append('receiver',receiver)
    return axios.post(`https://sidduweb.pythonanywhere.com/friendrequestreceiveconfirm/${name}`,formdata)
    .then(resp=>{
      if(name==='confirm'){
        setconfirmbool(prev=>({...prev,[receiver]:false}))
       }else{
         setdelbool(prev=>({...prev,[receiver]:false}))
       }
        userid.friendsrequest_receive=userid.friendsrequest_receive.filter(item=>item!==receiver)
        sessionStorage.setItem("profile",JSON.stringify(userid))
    })
  }

  const requestconfirmbtn=(sender,receiver,name)=>{
    notifyconfirmfetch(sender,receiver,name)
   
  }
 
  return (
    <div className="flex flex-col gap-3 w-[23vw] max-sm:w-full max-sm:h-full bg-gray-200 box-shadow rounded-xl">
      <div className="flex justify-between  mb-3 py-1 left-0 px-4 rounded-xl max-sm:mb-2 text-xl bg-white box-shadow font-bold">
        <span>Notifications</span>
        <span className="font-bold text-lg">@{userid?.usertag}</span>
      </div>
      <div className="flex overflow-y-auto px-2 user-scroll h-[55vh] max-sm:h-[77vh] rounded-xl flex-col gap-2">
        {notifications.length ?(
          notifications?.map((user) =>{
          return (
            <div
              key={user.id}
              className="flex p-2 w-full rounded-xl bg-white box-shadow"
            >
              <div className="flex w-full items-center gap-2">
                <img
                  className="w-[50px] object-contain h-[50px] rounded-full max-sm:w-[55px] max-sm:h-[55px] "
                  src={
                    user?.profile_img
                      ? `https://sidduweb.pythonanywhere.com${user.profile_img}`
                      : "unknown.png"
                  }
                />
                <div className="flex w-full justify-center gap-2 flex-col">
                  <span className="font-bold text-lg max-sm:text-xl">
                    {user.usertag}
                  </span>
                  <div className="flex w-[100%] text-white font-bold justify-around">
                    <button onClick={()=>requestconfirmbtn(userid.user,user.user,'confirm')} className={`bg-violet-600 ${!confirmbool[user.user] && 'pointer-events-none opacity-70'} rounded-[5px] w-[6.5vw] max-sm:w-[25vw] py-[2px]`}>
                      {!confirmbool[user.user] ?'Confirmed' : "Confirm"}
                    </button>
                    <button onClick={()=>requestconfirmbtn(userid.user,user.user,'delete')} className={ `bg-gray-300 ${!delbool[user.user] && 'pointer-events-none opacity-70'} text-black rounded-[5px] w-[6vw] max-sm:w-[28vw] max-sm:py-[6px] py-[2px]`}>
                      {!delbool[user.user] ?'Deleted' : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )})
          ):
          (
            <div className="font-bold text-lg w-full text-center">No Friend Requests....</div>
          )
          }
      </div>
    </div>
  );
};

export default Friends;
