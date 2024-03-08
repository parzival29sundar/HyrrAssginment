// import React, { useEffect } from 'react';
// import Messages from './Messages';
// import MessageInput from './MessageInput';
// import { TbMessages } from "react-icons/tb";
// import useConversation from '../../zustand/useConversation';
// import { useAuthContext } from '../../context/AuthContext';

// const MessageContainer = () => {
//     const {selectedConversation,setSelectedConversation} = useConversation();

//     useEffect(() =>{
//         return() => setSelectedConversation(null)
//     },[setSelectedConversation]);

//   return (
//     <div className='md:min-2-[450px] w-[500px] flex flex-col'>
//         {!selectedConversation ? (
//             <NoChatSelected />
//         ) :(
//         <>
//           <div className='bg-slate-300 px-4 py-2 mb-2'>
//             <span className='label-text'>To:</span>{" "}
//             <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
//             </div>  

//             <Messages />
//             <MessageInput />

//         </>
//         )}
      
//     </div>
//   );
// };

// export default MessageContainer;

// const NoChatSelected =() =>{
//     const {authUser} = useAuthContext();
//     const captialFullName =  authUser.fullName.toUpperCase();

//     return (
//         <div className='flex items-center justify-center w-full h-full'>
//             <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
//                 <p>Welcome 😘 {captialFullName} 🐼</p>
//                 <p>Select a chat to start messaging</p>
//                 <TbMessages className='text-3xl md:text-6xl text-center' />
                
//             </div>
//         </div>
//     );
// };




import React, { useEffect ,useRef,useState} from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { TbMessages } from "react-icons/tb";
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import {motion, useMotionValue} from 'framer-motion';


const MessageContainer = () => {
    const {selectedConversation,setSelectedConversation} = useConversation();
    const [loading, setLoading] = useState(false);

    const x= useMotionValue(0);
    const y= useMotionValue(0);

    useEffect(() =>{
        return() => setSelectedConversation(null)
    },[setSelectedConversation]);


  return (
    <motion.div 
    className='md:min-2-[450px] w-[500px] flex flex-col'
    
    
    >
        {!selectedConversation ? (
            <NoChatSelected />
        ) :(
        <>
          <div className='bg-slate-300 px-4 py-2 mb-2'>
            <span className='label-text'>To:</span>{" "}
            <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
            </div>  

            <Messages />
            <MessageInput />

        </>
        )}
             
    </motion.div>
  );
};

export default MessageContainer;


const CircleComponent = () =>{
    const [circles, setCircles] = useState([...Array(100)]);
    const containerRef = useRef(null);

    useEffect(()=>{
        const container = containerRef.current;

        const handleScroll = ()=>{
            if(container.scrollTop + container.clientHeight >= container.scrollHeight){
                setCircles((prevCircles)=> [...prevCircles, ...Array(200)]);
            }
        };
        container.addEventListener('scroll', handleScroll);
        return() => container.removeEventListener('scroll', handleScroll);
    },[]);

    

    const getRandomAvatar = (index) => {
        const avatarSize =100;
        let randomSeed = Math.floor((Math.random() *100)+index);
        console.log(randomSeed);
        return `https://robohash.org/${randomSeed}.png?size=${avatarSize}x${avatarSize}`;
    }


    const circleStyle = {
        backgroundColor: 'white',
        width: '70px',
        height: '70px',
        // backgroundColor: '#000',
        borderRadius: '20% 25%',
        margin: '14px 14px', // Adjust margin as needed
        
    };
    return (
        <div className='flex flex-wrap justify-center max-h-96 w-full overflow-auto ' ref={containerRef} style={{overflow: 'scroll' , scrollbarWidth: 'none'}}>
            {circles.map((_, index) => (
                index % 4 === 0 && index !== 0 ? (
                    <React.Fragment key={index}>
                        <div style={{ flexBasis: '100%', height: 0 }}></div>
                        <motion.div 
                        key={index} 
                        style={{...circleStyle, backgroundImage:`url(${getRandomAvatar(index)})` }}
                        whileHover={{
                            scale:[1,1.12,1.14,1.12,1,],
                            rotate: [0,0,180,180,0],
                            borderRadius:["50%","25%","20%","50%","25%"]
                        }}
                        transition={{
                            duration: 1,
                            ease: 'easeInOut',
                            times: [0,0.2,0.5,0.8,1],
                            repeat: 0,
                            
                        }}
                        tabIndex="0"
                        ></motion.div>

                    </React.Fragment>
                ) : (
                    <motion.div 
                    key={index} 
                        style={{...circleStyle, backgroundImage:`url(${getRandomAvatar(index)})` }}
                        whileHover={{
                            scale:[1,1.12,1.14,1.12,1,],
                            rotate: [0,0,180,180,0],
                            borderRadius:["50%","25%","20%","50%","25%"]
                        }}
                        transition={{
                            duration: 1,
                            ease: 'easeInOut',
                            times: [0,0.2,0.5,0.8,1],
                            repeat: 0,
                            
                        }}
                        tabIndex="0"
                     ></motion.div>
                )
            ))}
        </div>
    );

};

const NoChatSelected =() =>{
    const {authUser} = useAuthContext();
    const captialFullName =  authUser.fullName.toUpperCase();
    

    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center mt-16 sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p className='text-2xl'>Welcome {captialFullName} 🐼</p>
                <p>This is an Infinite Post Scroll Section with numerous Avatars👾</p>
                <TbMessages className='text-3xl md:text-6xl text-center ' />

                <CircleComponent />               
            </div>

            
        </div>
    );
};

