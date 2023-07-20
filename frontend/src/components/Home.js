import React, { useEffect, useState } from "react";
import profileImage from "../assets/Profile.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {

  const [user, setUser] = useState({
    name:"",
    email:"",
  })
  const data = sessionStorage.getItem("token")
  const navigate = useNavigate();

  const navi = () => {
    navigate("/");
  };

  return (
    <div>
      <h1> this is home page</h1>
      <button
        className="py-2 px-3 bg-slate-200 border rounded-xl"
        onClick={navi}
      >
        back to login page
      </button>
    </div>
  );
};

export default Home;
