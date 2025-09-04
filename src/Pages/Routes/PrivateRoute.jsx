import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
  const {user, loading} = useAuth();
  const location = useLocation();
  console.log(location);

  if(loading){
    return <span className="loading loading-dots loading-xl"></span>
  }
  if (!user) {
  return <Navigate to="/login" state={{ from: location }} replace />;
}
  return children;
};

export default PrivateRoute;