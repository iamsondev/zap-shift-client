import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth'
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxios from '../../../hooks/useAxios';

const Register = () => {
  const { createUser,updateUserProfile } = useAuth();
  const [profilePic, setProfilePic]= useState('');
  const axiosInstance = useAxios();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
    createUser(data.email, data.password)
      .then(async(result) => {
        console.log(result.user)

      //update user info the data b ase
        const userInfo = {
           name: data.name, 
          email: data.email,
          role: 'user', //default role
          created_at:new Date().toISOString(),
          last_log_in:new Date().toISOString()
        }

        const userRes = await axiosInstance.post('/users', userInfo);
        console.log(userRes);
        
      // update user profile in the firebase
        const userProfile ={
          displayName : data.name,
          photoUrl:profilePic

        }
        updateUserProfile(userProfile)
        .then(()=> {
          console.log('profile pic updated')
        })
        .catch(error=> {
          console.log(error)
        })

      })
      .catch(error => {
        console.error(error)
      })
  }
  const handleImageUpload = async(e) => {
    const image = e.target.files[0];
    console.log(image);
    const formData = new FormData();
    formData.append('image', image);
    
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`

    const res = await axios.post(imageUploadUrl,formData)
    setProfilePic(res.data.data.url)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">

            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-5">
              <h1 className="text-5xl font-bold">Register now!</h1>
              <div className="card-body">
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input type="text" {...register('name', { required: true })} className="input" placeholder="Your name" />
                  {
                    errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                  }
                  <label className="label">Your Photo</label>
                  <input type="file"
                    onChange={handleImageUpload}
                    className="input" placeholder="Your name" />
                  {/* email */}

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