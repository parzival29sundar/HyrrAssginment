import React from 'react'
import Conversation from "./Conversation";
import useGetConversations from '../../hooks/useGetConversations';
import { getRandomEmoji } from '../../utils/emojis';

const Conversations = () => {
  const {loading,conversations}=useGetConversations();
  // console.log("Conersations:", conversations);
  return (
    <div className='py-2 flex flex-col overflow-auto'>

      {conversations.map((conversation,idx)=>(
        <Conversation
          key ={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx ===conversations.length -1  }
        />
      ))}


      {loading ? <span className='loading loading-dots loading-sm mx-auto'></span> : null}
  
    </div>
  );
};

export default Conversations;
