import React, { useEffect, useState} from "react";
import axios from "axios";
import Loading from "./Loading";

const Friends = () => {
  const [requestbool, setrequestbool] = useState({})
  const [frndlist, setfrndlist] = useState([]);
 const [loading, setloading] = useState(true)
  let userid = JSON.parse(sessionStorage.getItem("profile"));
   
 const fetchfrnds = (id) => {
   return (
    axios.get(`https://sidduweb.pythonanywhere.com/friends/${id}`)
    .then((resp) =>{
      let data=resp.data
      !resp.data.length && setloading(false)
      setfrndlist(data)
      data.forEach(item=>{
        let userid=item.user
        setrequestbool(prev=>({...prev,[userid]:true}))
      })
     })
   )
 };

 useEffect(() => {
   fetchfrnds(userid?.user)
   
 }, [userid?.user]);


  const frndrequest=async (sender,receiver,name)=>{
    const formdata=new FormData()
    formdata.append('sender',sender)
    formdata.append('receiver',receiver)
    return axios.post(`https://sidduweb.pythonanywhere.com/friendrequestsent/${name}`,formdata)
    .then(resp=>{
      console.log(resp.data);
      if(name==='add'){
        userid.friendsrequest_sent.push(Number(resp.data.requestsentto))
        setrequestbool(prev=>({...prev,[receiver]:false}))
      }else{
        userid.friendsrequest_sent=userid.friendsrequest_sent.filter(item=>item!=Number(resp.data.requestcancelled))
        setrequestbool(prev=>({...prev,[receiver]:true}))
      }
       sessionStorage.setItem("profile",JSON.stringify(userid))
    })
  }

  const requestbtn=(sender,receiver,name)=>{
    frndrequest(sender,receiver,name)
    if(name==='remove' && requestbool[receiver]){
      setfrndlist(frndlist.filter(item=>item.user!==receiver))
    }
  }

  setTimeout(()=>setloading(false),1000)
  return (
    <div className="flex flex-col gap-3 w-[23vw] max-sm:w-full max-sm:h-full bg-gray-200 box-shadow rounded-xl">
      <div className="flex justify-between  mb-3 py-1 left-0 px-4 rounded-xl max-sm:mb-2 text-xl bg-white box-shadow font-bold">
        <span>Suggestions</span>
        <span className="font-bold text-lg">@{userid?.usertag}</span>
      </div>
      <div className="flex overflow-y-auto px-2 user-scroll h-[55vh] max-sm:h-[77vh] rounded-xl flex-col gap-2">
        {loading ? <Loading color={'black'} size={'w-9 h-9'} /> :(
         <>
         {frndlist.length ? (
          frndlist?.map((user) =>(
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
                    <button onClick={()=>requestbtn(userid.user,user.user,'add')} className={`bg-violet-600 ${userid?.friendsrequest_sent.includes(user.user) &&  'pointer-events-none opacity-80'} rounded-[5px] w-[6vw] max-sm:w-[25vw] py-[2px]`}>
                      {userid?.friendsrequest_sent?.includes(user.user) || requestbool[user?.user]  ?'Sent' : "Add"}
                    </button>
                    <button onClick={()=>requestbtn(userid.user,user.user,'remove')} className={` ${userid?.friendsrequest_sent.includes(user.user) ? 'bg-gray-300 text-black' :'bg-red-400' } rounded-[5px] w-[6vw] max-sm:w-[28vw] max-sm:py-[6px] py-[2px]`}>
                      {userid?.friendsrequest_sent?.includes(user.user) || !requestbool[user?.user]  ?'Cancel' : "Remove"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ):(
          <div className="font-bold text-lg w-full text-center">No Suggestions....</div>
         )}
         </>
        )}

      </div>
    </div>
  );
};

export default Friends;
 