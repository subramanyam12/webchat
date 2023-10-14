import { useState } from "react";
import "./App.css";
import Users from "./components/Users";
import Chatwindow from "./components/Chatwindow";

function App() {
  const [frndchat, setfrndchat] = useState([])
  const [chatactive, setchatactive] = useState(false)

  const getproffromusers=(prof)=>{
       setfrndchat(prof)
  }
  return (
    <>
      <Users getproffromusers={getproffromusers} setchatactive={setchatactive} />
      {chatactive && <Chatwindow frndchat={frndchat} chatactive={chatactive} setchatactive={setchatactive}  />}
    </>
  );
}

export default App;
