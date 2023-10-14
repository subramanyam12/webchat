import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Layout from "./components/Layout";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import { Store } from "./redux/Store";
import Friends from "./components/Friends";
import Notifications from "./components/Notifications";
import Settings from "./components/Settings";


const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Layout}>
          <Route index Component={Login} />
          <Route path="home" Component={App} />
          <Route path="profile" Component={Profile} />
          <Route path="friends" Component={Friends} />
          <Route path="notifications" Component={Notifications} />
          <Route path="settings" Component={Settings} />
        </Route>
      </Routes>
   </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <Main />
    </Provider>
  </React.StrictMode>,
);
