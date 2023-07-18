import React from "react";
import { toast } from "react-toastify";

const Registration = () => {
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
              />
              <label htmlFor="email" className="ml-2">
                Email
              </label>
              <input
                type="email"
                className="p-2 border rounded-lg"
                name="email"
                placeholder="Enter your email"
              />

              <label htmlFor="password" className="ml-2">
                password
              </label>
              <input
                type="password"
                className="p-2 border rounded-lg"
                name="password"
                placeholder="Enter your password"
              />
              <label htmlFor="cpassword" className="ml-2">
                Confirm Name
              </label>
              <input
                type="password"
                className="p-2 border rounded-lg"
                name="cpassword"
                placeholder="Confirm your password"
              />

              <button className="bg-[#074FB2] text-white py-2 rounded-lg mt-3">
                Register
              </button>
            </form>

            <div className="flex justify-center  items-center gap-4 mt-4">
              <p className="text-[#074FB2] text-base">
                Already have an account:
              </p>
              <button
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
