import React from 'react';
import {  useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';

const Login = () => {

  const {register, handleSubmit, formState: { errors }} = useForm();
  const location = useLocation();
  const {SignIn} = useAuth();
  console.log(location);
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const onSubmit = data => {
    SignIn(data.email, data.password)
    .then(result=> {
      console.log(result)
      navigate (from)
    })
    .catch(error=> {
      console.log(error)
    })
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
         <h1 className="text-5xl font-bold mb-2">Login now!</h1>
        <fieldset className="fieldset">

          <label className="label">Email</label>
          <input type="email" {...register('email', {required:true})} className="input" placeholder="Email" />

          <label className="label">Password</label>
          <input type="password" {...register('password', {required:true,
            minLength:6
          })} className="input" placeholder="Password" />
           {
            errors.password?.type === 'required' && <p className='text-red-500'>password is required</p>
          }

          {
            errors.password?.type === 'minLength' && <p className='text-red-500'>password must be 6 characters or longer</p>
          }
         
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
           <p>Don't have an account? please<Link to={'/register'}> <span className='text-lime-300 text-xl underline'>Register</span> </Link></p>
          
      </form>
       <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;