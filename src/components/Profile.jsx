import React, { useState, useEffect, useRef } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const Profile = () => {
  let sessionstore = JSON.parse(sessionStorage.getItem("profile"));
  const [name, setname] = useState();
  const file = useRef();
  const image = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionstore?.profile_img) {
      image.current.src = sessionstore.profile_img;
    }else{
      image.current.src="unknown.png"
    }
    sessionstore?.username && sessionstore?.username!=='null' && setname(sessionstore?.username);
  }, [sessionstore?.profile_img]);

  const profileupdate =async (id, body) => {
    return axios
      .patch(`https://sidduweb.pythonanywhere.com/profile/${id}/`, body)
      .then((resp) => {
        sessionStorage.setItem("profile", JSON.stringify(resp.data));
        navigate("/home");
      });
  };

  
  const submithandle = (e) => {
    e.preventDefault();
    var formdata = new FormData();
    if (file.current.files[0]) {
      formdata.append("profile_img", file.current.files[0]);
    }
    formdata.append("username", name);
    profileupdate(sessionstore?.id, formdata);
  };

  const filehandle = () => {
    if (!file.current.files.length) return;
    image.current.src = URL.createObjectURL(file.current.files[0]);
  };

  return (
    <>
      <form
        onSubmit={submithandle}
        className="w-[23vw] max-sm:w-full h-[65vh] max-sm:h-full flex flex-col gap-6 py-5 items-center box-shadow rounded-xl bg-white"
      >
        <h1 className="font-bold text-3xl">Profile</h1>
        <input
          onChange={filehandle}
          ref={file}
          type="file"
          hidden
          accept="image/*"
        />
        <div className="relative ">
          <img className=" object-cover object-center w-[150px] max-sm:w-[200px] max-sm:h-[200px] h-[150px] rounded-full" ref={image} src="unknown.png" alt="" />
          <div className="absolute right-0 border-[1px] border-gray-500 bg-gray-200 rounded-full p-1 -bottom-1">
            <AiOutlineCamera
              onClick={() => file.current.click()}
              className="text-3xl text-gray-700 cursor-pointer max-sm:cursor-default"
            />
          </div>
        </div>
        <label>
          <span className="font-semibold text-lg ">Name: </span>
          <br />
          <input
            type="text"
            name="name"
            className="outline-none mt-1 border-[1px] w-[20vw] max-sm:w-[79vw] border-black rounded-lg py-1 max-sm:py-2 px-2"
            onChange={(e) => setname(e.target.value)}
            value={name}
            placeholder="enter name"
          />
        </label>
        <button className="bg-blue-600 rounded-lg text-white font-bold text-lg max-sm:text-2xl py-[3px] max-sm:py-[5px] max-sm:px-9 px-7">
          Add
        </button>
      </form>
    </>
  );
};

export default Profile;
