import React, { useState } from 'react';
import {BsSend} from "react-icons/bs";
import useSendMessage from '../../hooks/useSendMessage';

const MessageInput = () => {

  const [message,setMessage] = useState("");
  const {loading,sendMessage}=useSendMessage();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!message) return;
    await sendMessage(message);
    setMessage("");
  };


  return (
    <form className='pd-4 my-3' onSubmit={handleSubmit}>
        <div className='w-full relative'>
            <input type="text"
            className='border text-sm rounded-[50px] block p-2 ml-3 w-[425px] bg-gray-800 tex-white'
            placeholder='Send a message bruh!'
            value ={message}
            onChange={(e) => setMessage(e.target.value)}
             />
          
          
            <button type='submit'
                    className='absolute inset-y-0 end-0 flex items-center justify-center w-9 h-9 rounded-full bg-sky-800 mr-5'>
                {loading ? <div className='loading loading-ring loading-sm'></div>: <BsSend />}

            </button>
          

        </div>
    </form>
  );
};

export default MessageInput;
