import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log(login);
    const { email, password } = login;
    if (!email || !password) {
      toast.warn("field missing", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }

    const response = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    let data = await response.json();

    const { msg, token } = data;
    console.log("token :", token);
    console.log(msg);
    if (msg === "invalid credentials") {
      toast.error("invalid credentials", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }
    if (response.status >= 400 || !data) {
      toast.error("server error in login", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.success("login successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      sessionStorage.setItem("token", token);
      console.log("logged in successfully");
      navigate('/home')
    }
  };

  const navigate = useNavigate();

  const nav = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="bg-gray-700 flex justify-center items-center min-h-screen">
        <div className="bg-gray-100 p-3 border rounded-xl shadow-xl max-w-3xl">
          <div className=" w-96 px10">
            <h2 className="text-lg text-blue-700 font-bold  text-center">
              Login
            </h2>

            <form className="flex flex-col gap-1 mt-5">
              <label htmlFor="email" className="ml-2">
                Email
              </label>
              <input
                type="email"
                className="p-2 border rounded-lg"
                name="email"
                onChange={handleChange}
                placeholder="Enter your email"
              />

              <label htmlFor="password" className="ml-2">
                password
              </label>
              <input
                type="password"
                className="p-2 border rounded-lg"
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
              />

              <button
                onClick={submit}
                className="bg-[#074FB2] text-white py-2 rounded-lg mt-3"
              >
                Login
              </button>
            </form>
            <div className="flex justify-center  items-center gap-4 mt-4">
              <p className="text-[#074FB2] text-base">Don't have an account:</p>
              <button
                onClick={nav}
                className="py-2 px-4 bg-white border rounded-lg text-sm "
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
