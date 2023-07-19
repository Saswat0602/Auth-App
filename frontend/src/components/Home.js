import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
const navigate = useNavigate();

const navi=()=>{
  navigate('/')
}
  
  return (
    <div>
      <h1> this is home page</h1>
      <button className='py-2 px-3 bg-slate-200 border rounded-xl' onClick={navi}>back to login page</button>
    </div>
  );
}

export default Home
