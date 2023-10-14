import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { addprofile } from "../redux/slices/ProfileSlice";
import axios from "axios";

const Login = () => {
  const [inputdata, setinputdata] = useState({
    username: "",
    password: "",
    password2: "",
  });
  const [islogin, setislogin] = useState(true);
  const [passmatch, setpassmatch] = useState(true);
  const [error, seterror] = useState("");
  const [isloading, setisloading] = useState(false)

  const navigate = useNavigate();
  const [token, settoken] = useCookies(["mytoken"]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (islogin && token["mytoken"]) {
      navigate("home");
    } else if (token["mytoken"]) {
      navigate("profile");
    }
  }, [token]);

  const productpost = (name) => {
    return axios.post(`http://sidduweb.pythonanywhere.com/${name}/`, {
      username: inputdata.username,
      password: inputdata.password,
    });
  };

  const getprofile = (name) => {
    axios.get(`http://sidduweb.pythonanywhere.com/userprofile/${name}`).then((resp) => {
      dispatch(addprofile({ prof: resp.data }));
      setisloading(false)
      localStorage.setItem("profile", JSON.stringify(resp.data));
    });
  };

  const inputhandle = (name, data) => {
    setinputdata((prev) => ({ ...prev, [name]: data }));
  };

  const formhandle = (e) => {
    e.preventDefault();
    if (!islogin && inputdata.password !== inputdata.password2) {
      seterror("Passwords didn't match");
      setpassmatch(false);
      return;
    }
    setisloading(true)
    productpost(islogin ? "auth" : "users")
      .then((resp) => {
        let data = resp.data;
        if (data && islogin) {
          settoken("mytoken", data.token);
          getprofile(inputdata.username);
        } else if (data) {
          productpost("auth").then((resp) => {
            settoken("mytoken", resp.data.token);
            getprofile(inputdata.username);
          });
        }
      })
      .catch((error) => {
        let errormsg = error.response.data?.non_field_errors?.[0]
          ? error.response.data?.non_field_errors[0]
          : error.response.data.username[0];
        setpassmatch(false);
        setTimeout(()=>setisloading(false),300)
        seterror(errormsg);
      });
      
  };

  const logintoreg = () => {
    setinputdata({ username: "", password: "", password2: "" });
    setislogin(!islogin);
    seterror(true);
    setisloading(false)
  };

  return (
    <div className="flex flex-col h-full gap-3 relative justify-center items-center">
      <form
        onSubmit={formhandle}
        className="flex login flex-col gap-4 rounded-xl p-7 box-shadow bg-white items-center"
      >
        <h1 className="font-extrabold w-full max-sm:text-xl text-center text-[2vmax]  uppercase">
          {islogin ? "Login" : "Register"}
        </h1>
        <label>
          <span className="font-semibold text-[17px]">Username: </span>
          <br />
          <input
            type="text"
            name="username"
            value={inputdata.username}
            onChange={(e) => inputhandle(e.target.name, e.target.value)}
            className="outline-none rounded-lg w-[25vw] max-sm:w-[80vw] p-[6px] border-[1px] border-gray-700"
            placeholder="username"
            required
          />
        </label>
        <label>
          <span className="font-semibold text-[17px]">Password: </span>
          <br />
          <input
            type="password"
            name="password"
            value={inputdata.password}
            onChange={(e) => inputhandle(e.target.name, e.target.value)}
            className="outline-none rounded-lg w-[25vw] max-sm:w-[80vw] p-[6px] border-[1px] border-gray-700"
            placeholder="password"
            required
          />
        </label>

        {!islogin && (
          <>
            <label>
              <span className="font-semibold text-[17px]">
                Confirm Password:{" "}
              </span>
              <br />
              <input
                type="password"
                name="password2"
                value={inputdata.password2}
                onChange={(e) => inputhandle(e.target.name, e.target.value)}
                className="outline-none rounded-lg w-[25vw] max-sm:w-[80vw] p-[6px] border-[1px] border-gray-700"
                placeholder="confirm password"
                required
              />
            </label>
          </>
        )}
        <span className={`text-red-500 font-medium text-[15px] -mt-3 ${passmatch ? "invisible" : "visible"}`}>{error}.</span>

        <button className="bg-blue-500 text-white flex justify-center font-bold w-[9vw] max-sm:w-[24vw] py-1 text-xl">
          {!isloading ? <span>{islogin ? "Login" : "Register"}</span> :<p className="w-6 h-6 my-[2px] rounded-full border-t-[3px] border-l-2 animate-spin border-white"></p>}
        </button>
        <div>
          {islogin ? "Don't" : "Already"} Have An Account ,
          <span
            className="font-bold cursor-pointer text-green-700 text-lg border-b-[1px] border-black"
            onClick={logintoreg}
          >
            {islogin ? "Register" : "Login"}
          </span>{" "}
          Here
        </div>
      </form>
    </div>
  );
};

export default Login;
