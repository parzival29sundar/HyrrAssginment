import React from 'react';
import { SiOpensearch } from "react-icons/si";

const SearchInput = () => {
  return (
    <form className='flex items-center gap-2'>
        <input type="text" placeholder='Search bruh...' className='input input-bordered rounded-full mt-4 ml-3 bg-gray-600 border-white text-white' />
        <button type='submit' className='btn btn-circle bg-teal-600 text-white border-white mt-4 mr-3'>
           <SiOpensearch className='w-6 h-6 outline-none'/>
        </button>
    </form>
  );
};

export default SearchInput;
