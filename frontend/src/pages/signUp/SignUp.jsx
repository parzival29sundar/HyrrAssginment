import React from 'react'
import GenderCheckbox from './GenderCheckbox';
import Terms from './Terms';
import { Link } from 'react-router-dom';
import {useState} from "react";
import useSignup from '../../hooks/useSignup';
import styled from 'styled-components';
import {motion} from 'framer-motion';

const StyleSignup = styled(motion.div)`
width:900px;
transition: width 0.3s, box-shadow 0.3s ease;
&:hover{
  box-shadow: 3px 10px 10px black;
  transition-delay: 0.2s;

}
@media (min-width: 600px) and (max-width: 1200px){
  width:500px;
  height: 500px;

}
`;

const StyledSignupField = styled.div`
@media (min-width: 600px) and (max-width: 1200px){
  width:300px;

}

`;

const SignUp = () => {
  const [inputs,setInputs] = useState({
    fullName:'',
    username:'',
    email:'',
    password:'',
    confirmPassword:'',
    gender:'',
    profilePicture:null,
    otherCheckbox:false,
  });

  const{loading,signup} =useSignup();

  const handleCheckboxChange=(gender) =>{
    setInputs({...inputs,gender});
  };

  const handleOtherCheckboxChange=() =>{
    setInputs({...inputs});
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if(file){
      const fileSize = file.size;
      const maxSizeInBytes = 4*1024*1024;

      if(fileSize > maxSizeInBytes){
        console.error("Profile Picture size too large");
        return;
      }
    }
    

    //
    const reader = new FileReader();
    reader.onloadend= () =>{

      console.log(reader.result);
      setInputs({...inputs, profilePicture:reader.result});
    };
    if(file){
      reader.readAsDataURL(file);
    }

    // setInputs({...inputs, profilePicture:file});
  };

  //




  // const handleOtherCheckboxChange = () =>{
  //   setInputs({...inputs, otherCheckbox: !inputs.otherCheckbox});
  // };




  // const handleProfilePictureChange = (e) =>{
  //   const file = e.target.files[0];
  //   setInputs({...inputs, profilePicture:file });
  // };


  const handleSubmit = async(e)=>{
    e.preventDefault();
    await signup(inputs);

  };
 

  return (

    <div className='flex flex-col items-center justify-center min-96 mx-auto  '>

      <StyleSignup 
      className='w-[800px] p-[60px] rounded-2xl shadow-xl border border-white bg-slate-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 '
      initial= {{scale:0}}
      animate={{rotate: 360, scale:1}}
      transition={{
        type:"spring",
        stiffness:260,
        damping:20,
        onComplete: {scale:1}
      }}  
      >
        
        <motion.h1 className='text-3xl font-semibold text-center text-gray-200'
                    whileHover={{scale:[1, 1.5, 0.9, 1.45 , 0.9, 1.2 , 0.9, 1.05 , 0.9 , 1],  transition:{duration: 1.6, repeat: 0} }}>
          SignUp <span className='text-blue-500'> Page</span>
        </motion.h1>
       
        <form onSubmit={handleSubmit}> 
       
        
      {/* PROFILE PICTURE SECTION */}
      <div className="flex justify-center mt-6 mb-8">
            <label htmlFor="profilePictureInput" className="relative cursor-pointer">
              <div className="w-32 h-32 rounded-full border border-gray-300 flex items-center justify-center shadow-2xl">
                {inputs.profilePicture ? (
                  <img 
                  //  src={URL.createObjectURL(inputs.profilePicture)} 
                  src={inputs.profilePicture}
                   alt="Profile"
                   className="w-full h-full rounded-full" 
                   />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                )}
              </div>
              <input
               type="file" 
              id="profilePictureInput" 
              accept="image/*" 
              onChange={handleProfilePictureChange}
               className="hidden" />
            </label>
            {inputs.profilePicture &&(
              <button
               onClick={() => setInputs({...inputs, profilePicture:null})} 
               className=' absolute ml-[100px] w-6 h-6 mt-24 rounded-xl bg-gray-900 text-gray-300 shadow'>R</button>
            )}
          </div>





          <div>
            <label className='label p-2 mt-5'>
              <StyledSignupField className='text-base label-text ' style={{ fontSize: '23px' }}>Full Name Bruh!</StyledSignupField>
            </label>
              <input type="text" 
              placeholder='John Doe' 
              className='w-full input input-bordered h-10' 
              style={{'--tw-placeholder-opacity':'0.4'}}
              value ={inputs.fullName}
              onChange={(e) => setInputs({...inputs, fullName:e.target.value})}
               />
                
          </div>


          <div>
          <label className='label p-2 mt-3'>
              <span className='label-text text-2xl'>User Name</span>
            </label>
              <input type="text" placeholder='John Doe' className='w-full input input-bordered h-10'
             value ={inputs.username}
             onChange={(e) => setInputs({...inputs, username:e.target.value})}
              />

          </div>

        <div>
          <label className='label p-2 mt-3'>
              <span className='text-2xl label-text '>Email</span>
            </label>
              <input type="email" placeholder='@gmail.com' className='w-full input input-bordered h-10'
             value ={inputs.email}
             onChange={(e) => setInputs({...inputs, email:e.target.value})}
              />

          </div> 

          <div>
          <label className='label p-2 mt-3'>
              <span className='text-2xl label-text '>Password Bruh!</span>
            </label>
              <input 
              type="password" 
              placeholder='Enter Password' 
              className='w-full input input-bordered h-10'
              value ={inputs.password}
              onChange={(e) => setInputs({...inputs, password:e.target.value})}
               />

          </div>

          <div>
          <label className='label p-2 mt-3'>
              <span className='text-2xl label-text '>Password Bruh!</span>
            </label>
              <input 
              type="password" 
              placeholder='Confirm Password' 
              className='w-full input input-bordered h-10'
              value ={inputs.confirmPassword}
              onChange={(e) => setInputs({...inputs, confirmPassword:e.target.value})}
               />

          </div>

          <GenderCheckbox onCheckboxChange ={handleCheckboxChange} selectedGender={inputs.gender} />
          <Terms onCheckboxChange ={handleOtherCheckboxChange} selectedGender={inputs} />



          {/* TERMS AND CONDITION CHECKBOX */}

          {/* <div className="mt-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={inputs.otherCheckbox}
                onChange={handleOtherCheckboxChange}
              />
              <span className="ml-2 text-base label-text">Do you agree with the Terms and conditions?</span>
            </label>
          </div> */}




          {/* <Link to={"/login"}
          className='text-sm hover:underline hover:text-blue-600 mt-4 inline-block' href='#'>
            Already have an account?WTF are u doing
          </Link> */}

          <div className='flex flex-row'>
            {/* <button className='btn btn-block btn-sm mt-3 h-16 border border-slate-700  w-24 relative overflow-hidden group ' style={{width:"330px" }} 
                            
            disabled ={loading}
            >
              {loading ? <span className='loading loading-spinner'></span> : "Already have an account!"}
            </button> */}


          <Link to={"/login"}
          className='btn btn-block btn-sm mt-3 h-16 border border-slate-700 ml-8 ease-in duration-300' style={{width:"330px"}}
          disabled ={loading}
          >
            {loading ? <span className='loading loading-spinner'></span> : "Already have an account?"}
          </Link> 

            <button className='btn btn-block btn-sm mt-3 h-16 border border-slate-700 ml-14 ease-in duration-300' style={{width:"330px"}}
            disabled ={loading}
            >
              {loading ? <span className='loading loading-spinner'></span> : "Sing Up Here!"}
            </button>
            
          </div>
          
        </form>

      </StyleSignup>

    </div>
  );
};

export default SignUp;
