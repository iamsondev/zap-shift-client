import React from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">

          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-5">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <div className="card-body">
              {/* email */}
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input type="email" {...register('email', {required:true})} className="input" placeholder="Email" />
                {
                  errors.email && <p className='text-red-500'>Email is required</p>
                }

                   {/* password */}
                <label className="label">Password</label>
                <input type="password" {...register('password', {required:true , minLength:7} )} className="input" placeholder="Password" />
                {
                  errors.password && <p className='text-red-500'>Password is required</p>
                }
                {
                  errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be at least 6 characters</p>
                }

                <button className="btn btn-neutral mt-4">Register</button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;