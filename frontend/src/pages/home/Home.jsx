import React from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from '../../components/messages/MessageContainer';
import {motion} from 'framer-motion';


const Home = () => {
  return (

    <motion.div 
    className='flex sm:h-[450px] md:h-[550px] rounded-[25px] overflow-hidden border border-white bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10'
    // initial={{scale:0}}
    // animate={{rotate:360 , scale:1}}
    // transition={{
    //   type: "spring",
    //   stiffness: 300,
    //   damping: 30,
      
    // }}
    // style={{perspective: "1000px"}}
    >
        <Sidebar />
        <MessageContainer />
    </motion.div>
  );
};

export default Home;


