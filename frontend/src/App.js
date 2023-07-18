import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Registration from "./components/Registration";
import Login from "./components/Login";
import NotFound from "./components/NotFound";


function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/register" element={<Registration/>} />
        <Route exact path="*" element={<NotFound/>} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
