import React from 'react';
import useUserRole from '../../../hooks/useUserRole'
import Loading from '../../../Component/Loading';
import UserDashboard from './UserDashboard';
import RiderDashboard from './RiderDashboard';
import Forbidden from '../../forbidden/forbidden';
import AdminDashboard from './AdminDashboard';

const DashboardHome = () => {
  const {role, roleLoading} = useUserRole();
  
  if(roleLoading){
    return <Loading></Loading>
  }
  if(role === 'user'){
    return <UserDashboard></UserDashboard>
  }
  else if(role === 'rider'){
    return <RiderDashboard></RiderDashboard>
  }
  else if(role === 'admin'){
    return <AdminDashboard></AdminDashboard>
  }
  else {
    return <Forbidden></Forbidden>
  }

};

export default DashboardHome;