import React, { useEffect, useState } from "react";
import profileImage from "../assets/Profile.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
let mount = false;

const Home = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();

  const data = sessionStorage.getItem("token");
  console.log(data);

  useEffect(() => {
    if (mount) {
      getAuthData();
    }
    mount = true;
    return () => {
      // cleanup function
    };
  }, []);

  const getAuthData = async () => {
    if (!data) {
      toast.warn("please login first", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/");
    } else {
      try {
        const responce = await fetch("http://localhost:4000/api/home", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${data}`,
          },
          mode: "cors",
        });

        const responceData = await responce.json();
        console.log(responceData);
        setUser(responceData);
      } catch (error) {
        toast.error("server login error", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/");
      }
    }
  };

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="bg-slate-200 min-h-screen flex justify-center items-center flex-col">
        <div className="flex items-center gap-4 bg-gray-300 px-5 py-3 border rounded-xl  ">
          <img className="h-32" src={profileImage} alt="profile" />
          <div className="flex flex-col gap-3">
            <h3>Name :{user.name}</h3>
            <h5>Email :{user.email}</h5>
          </div>
        </div>
        <div>
          <button className="bg-green-500 px-14 border rounded-xl py-3 text-lg text-white">
            Edit{" "}
          </button>
          <button
            className="bg-pink-400 px-14  border rounded-xl py-3 text-lg text-white "
            onClick={logout}
          >
            Logut{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
