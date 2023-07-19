import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Registration = () => {

 const [input, setInput] = useState({
   name: "",
   email: "",
   password: "",
   cpassword: "",
 });


const handelChange = (e) => {
  const { name, value } = e.target;
  setInput((prev) => {
    return { ...prev, [name]: value };
  });
};

const register = async(e)=>{
    e.preventDefault();
    const {name, email, password,cpassword} = input
    if (!name || !password ||!email || !cpassword){
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
      return false
    } 

    if(password !== cpassword){
       toast.error("password mismatch", {
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


    const response = await fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, cpassword }),
    });

    const data = await response.json()
    console.log('data', data)
    if(response.status >=400 ||!data){
        toast.error("some error occur", {
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
    else{
       toast.success("User register successfully", {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
       });
       nav('/home')
    }

  }
     const navigate = useNavigate();

     const nav = () => {
       navigate("/");
     };

  return (
    <>
      <div className="bg-gray-700 flex justify-center items-center min-h-screen">
        <div className="bg-gray-100 p-3 border rounded-xl shadow-xl max-w-3xl">
          <div className=" w-96 px10">
            <h2 className="text-lg text-blue-700 font-bold  text-center">
              Register
            </h2>

            <form className="flex flex-col gap-1 mt-5">
              <label htmlFor="name" className="ml-2">
                Name
              </label>
              <input
                type="text"
                className="p-2 border rounded-lg"
                name="name"
                placeholder="Enter your name"
                onChange={handelChange}
              />
              <label htmlFor="email" className="ml-2">
                Email
              </label>
              <input
                type="email"
                className="p-2 border rounded-lg"
                name="email"
                placeholder="Enter your email"
                onChange={handelChange}
              />

              <label htmlFor="password" className="ml-2">
                password
              </label>
              <input
                type="password"
                className="p-2 border rounded-lg"
                name="password"
                placeholder="Enter your password"
                onChange={handelChange}
              />
              <label htmlFor="cpassword" className="ml-2">
                Confirm Name
              </label>
              <input
                type="password"
                className="p-2 border rounded-lg"
                name="cpassword"
                placeholder="Confirm your password"
                onChange={handelChange}
              />

              <button
                onClick={register}
                className="bg-[#074FB2] text-white py-2 rounded-lg mt-3"
              >
                Register
              </button>
            </form>

            <div className="flex justify-center  items-center gap-4 mt-4">
              <p className="text-[#074FB2] text-base">
                Already have an account:
              </p>
              <button
                onClick={nav}
                className="py-2 px-4 bg-white border rounded-lg text-sm "
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
