import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../Pages/Shared/Logo';
import AuthImg from '../assets/authImage.png'
const AuthLayout = () => {
  return (
    <div className="p-12 bg-base-200 min-h-screen">
      <Logo></Logo>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div>
          <img
            src={AuthImg}
            className="flex-1 max-w-sm rounded-lg shadow-2xl"
          />
        </div>
        <div>
          <Outlet className="flex-1"></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;