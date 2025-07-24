import React from 'react';
import logo from '../../assets/logo.png'
const Logo = () => {
  return (
    <div className='flex'>
         <img src={logo} alt="" />
         <p className='text-4xl mt-2'>ProFast</p>
    </div>
  );
};

export default Logo;