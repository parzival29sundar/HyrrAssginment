import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
import styled from 'styled-components';
import {motion} from 'framer-motion';

const StyleLogin = styled(motion.div)`
width:900px;
transition: box-shadow 0.3s ease;
&:hover{
  box-shadow: 3px 10px 10px black;
  transition-delay: 0.2s;

}
@media (min-width: 0px) and (max-width: 600px){
  width:300px
}
`;


const Login = () => {
  
  const [username, setUsername] = useState("");
  const [password , setPassword] = useState("");


  const {loading,login} = useLogin();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    await login(username, password);
  }
  const handleSignupClick = () =>{
    setTimeout(()=>{
      window.location.href = '/signUp';
    });  
  };



  return (
    <div className='flex flex-col min-h-screen justify-center items-center  min-w-96 mx-auto'>
      <StyleLogin 
      className='w-full max-w-md p-6 rounded-md shadow-md bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'
      // initial= {{scale:0}}
      // animate={{rotate: 360, scale:1}}
      // transition={{
      //   type:"spring",
      //   stiffness:260,
      //   damping:20,
      //   onComplete: {scale:1}
      // }}  
      key ='login'
      
      >
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Login
          <span className='text-blue-400'> Page</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className='mt-4'>
            <label className='label '>
              <span className='label-text text-2xl'>Username</span>
            </label>
            <input
             type='text'
              placeholder='Enter Username' 
              className='w-full input input-bordered h-12'
              value = {username}
              onChange={(e)=> setUsername(e.target.value)}
            />
          </div>

          <div className='mt-4'>
            <label className='label'>
              <span className='text-2xl label-text'>Password</span>
            </label>
            <input
             type="password"
             placeholder='Enter Password'
             className='w-full input input-bordered h-12'
             value={password}
             onChange={(e)=> setPassword(e.target.value)}
            />
          </div>
            <Link
             to="/signUp"
             onClick={handleSignupClick}
             className='text-lg text-gray-100  hover:text-blue-500 mt-4 inline-block transition duration-300'>
              {"Don't "} have an account?
            </Link>

            <div className='mt-6'>
              <button className='btn btn-block btn-lg'
              disabled ={loading}>               
              {loading ? <span className='loading loading-dots loading-sm ' ></span> : "Login"}


              </button>
            </div>

        </form>
        </StyleLogin>
    </div>
  )
};

export default Login;
 