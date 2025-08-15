import React from 'react';
import logo from '../../assets/logo.png'
import { Link } from 'react-router';
const Logo = () => {
  return (
    <Link to='/'>
      <div className='flex'>
        <img src={logo} alt="" />
        <p className='text-4xl mt-2'>ProFast</p>
      </div>
      </Link>
  );
};

export default Logo;