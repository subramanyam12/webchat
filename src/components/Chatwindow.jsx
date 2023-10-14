import React, { useState,useEffect, useRef } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { TfiControlForward } from "react-icons/tfi";
import Message from "./Message";
import axios from "axios";
import Dateconvert from "./Dateconvert";
import 'animate.css';


const Chatwindow = ({frndchat,chatactive,setchatactive}) => {
  const [messages, setmessages] = useState([]);
  const [inputmsg, setinputmsg] = useState("");
  const box = useRef(null);
  
  let localprofile = JSON.parse(localStorage.getItem("profile"));
 
  const fetchmessages=()=>{
  return (
    axios.get('https://sidduweb.pythonanywhere.com/chatmessages')
    .then(resp=>{
      let filtermsgs=resp.data.filter(msg=>(msg.sender_profile===localprofile?.id && msg.receiver_profile===frndchat?.id) || (msg.sender_profile===frndchat?.id && msg.receiver_profile===localprofile?.id))
      if(messages.length===filtermsgs.length)return
      setmessages(filtermsgs)
      if(filtermsgs.length!==messages.length)setTimeout(() => (box.current.scrollTop = box.current.scrollHeight));
    })
  )
 }

useEffect(()=>{
  fetchmessages()
  const intervalId = setInterval(fetchmessages, 1500);
    return () => clearInterval(intervalId);
},[frndchat,messages])

 const postmessage=(body,sender,receiver)=>{
   let formdata=new FormData()
   formdata.append('body',body)
   formdata.append('sender',sender)
   formdata.append('receiver',receiver)
  return(
    axios.post('https://sidduweb.pythonanywhere.com/postmessage',formdata)
    .then(resp=>{
     setmessages(prev=>[...prev,resp.data])
     setTimeout(() => (box.current.scrollTop = box.current.scrollHeight), 10);
    })
  )
 }

  const send = () => {
    if(messages){
     postmessage(inputmsg,localprofile?.id,frndchat?.id)
     setinputmsg("");
    }
  }; 
      

  return (
    <div className={`box-shadow ${chatactive ? 'block' :'hidden'} chatwindow_animate max-sm:pb-8 max-sm:-mt-3 max-sm:-ml-3 max-sm:absolute max-sm:z-10 max-sm:top:0 max-sm:w-full max-sm:h-[95vh] flex flex-col bg-white p-3 pt-2 rounded-xl h-auto`}>
      <div className="flex items-center justify-between border-b-[1px] pb-2 border-gray-300 p-2 py-1 w-full bg-white">
        <div className="flex items-center gap-2">
          <img
            className="w-[40px] rounded-full max-sm:w-[60px]"
            src={frndchat?.profile_img ?`https://127.0.0.1:8000/${frndchat?.profile_img}`:'unknown.png'}
          />
          <div className="flex flex-col">
            <span className="font-bold">{frndchat?.usertag}</span>
            <div className="text-sm -mt-1 text-gray-500 flex gap-2">
              <span className="ml-1">{frndchat?.online_status && frndchat?.last_seen ? 'online':<span>last seen <Dateconvert currentDate={frndchat?.last_seen} /></span>}</span>
            </div>
          </div>
        </div>
        <TfiControlForward
          onClick={() => setchatactive(false)}
          className="text-2xl hidden max-sm:block"
        />
      </div>
      <div
        ref={box}
        className=" py-4 overflow-y-auto chatwindow h-[45vh] max-sm:h-full w-full "
      >
        {messages.map((msg) =><Message key={msg.id} person={localprofile?.id===msg.sender_profile } msg={msg.body} currentDate={msg.time_now} />)}
      </div>
      <div className="flex items-center border-t-[1px] pt-3 border-gray-300 gap-[14px] ">
        <input

          type="text"
          onKeyDown={(e) => e.key === "Enter" && inputmsg && send()}
          onChange={(e) => setinputmsg(e.target.value)}
          value={inputmsg}
          className="bg-gray-200 max-sm:w-full w-[22em] rounded-2xl p-2 max-sm:p-3 outline-none"
          placeholder="type your message"
        />
        <div
          onClick={()=>inputmsg && send()}
          className="bg-violet-700 cursor-pointer text-white flex items-center justify-center text-xl max-sm:w-12 max-sm:h-11  h-10 w-11 rounded-xl"
        >
          <BsFillSendFill />
        </div>
      </div>
    </div>
  );
};

export default Chatwindow;
