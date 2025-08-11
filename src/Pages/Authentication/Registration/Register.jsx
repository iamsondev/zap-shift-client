import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth'
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
  const { createUser } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data);
    createUser(data.email, data.password)
      .then(result => {
        console.log(result.user)

      })
      .catch(error => {
        console.error(error)
      })
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">

            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-5">
              <h1 className="text-5xl font-bold">Register now!</h1>
              <div className="card-body">
                {/* email */}
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                  {
                    errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                  }

                  {/* password */}
                  <label className="label">Password</label>
                  <input type="password" {...register('password', { required: true, minLength: 7 })} className="input" placeholder="Password" />
                  {
                    errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                  }
                  {
                    errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be at least 6 characters</p>
                  }

                  <button className="btn bg-lime-300 text-black mt-4 text-xl">Register</button>
                  <p>Already have an account? please<Link to={'/login'}> <span className='text-lime-300 text-xl underline'>login</span> </Link></p>

                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;