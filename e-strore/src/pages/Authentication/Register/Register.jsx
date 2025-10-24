import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import SocialLogin from '../../shared/SocialLogin/SocialLogin';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2'

const Register = () => {
      const { register, handleSubmit,reset, formState: { errors } } = useForm();
      const [profilePic, setProfilePic] = useState('');
      const {user,loading, createUser,updateUserProfile}=useAuth();
      const axiosPublic=useAxiosPublic();
      const navigate=useNavigate();

      // console.log(profilePic);

      const onSubmit = data => {
          if (!profilePic) {
            return Swal.fire({
              title: "Please upload your profile picture first 📸",
              icon: "warning",
            });
          }
  
          createUser(data.email, data.password)
          .then(result=>{
            const user=result.user;
            console.log(user);

            // update user info in the database.
            const userProfile={
              displayName:data.name,
              photoURL:profilePic,
            }

            updateUserProfile(userProfile)
            .then(()=>{
              console.log("profile name and picture updated");
              const userInfo={
                name:data.name,
                email:data.email,
                photoUrl:profilePic,
              }
              axiosPublic.post("/users", userInfo)
              .then(res=>{
                console.log("user added to the database.");
                    if (res.data.insertedId) {
                      Swal.fire({
                        title: `Hey! ${data.name} Your Account is Created Successfully!`,
                        icon: "success",
                        draggable: true,
                      });
                      reset();
                      navigate("/");
                    }
                    else {
                      Swal.fire({
                        title: `Welcome back, ${data.name}! 😎`,
                        icon: "info",
                      });
                    }
              })
              .catch(error=>{
                console.error(error);
              })
            })
            .catch((error)=>{
              console.error(error);
            })
          })
          .catch(error=>{
            console.error(error);
          })
      }

const handleImageUpload = async (e) => {
  try {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);

    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
    const res = await axios.post(imagUploadUrl, formData);

    setProfilePic(res.data.data.url);
    Swal.fire({
      title: "Profile picture uploaded successfully! 📸",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Failed to upload image 😢",
      icon: "error",
    });
  }
};

  return (
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Create Account</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        {/* name field */}
                        <label className="label">Your Name</label>
                        <input type="text"
                            {...register('name', { required: true })}
                            className="input" placeholder="Your Name" />
                        {
                            errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>
                        }
                        {/* name field */}
                        <label className="label">Chose Your Picture</label>
                        <input type="file"
                            onChange={handleImageUpload}
                            className="input" placeholder="Your Profile picture" />

                        {/* email field */}
                        <label className="label">Email</label>
                        <input type="email"
                            {...register('email', { required: true })}
                            className="input" placeholder="Email" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                        }
                        {/* password field*/}
                        <label className="label">Password</label>
                        <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>
                        }

                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-primary text-black mt-4">Register</button>
                    </fieldset>
                    <p><small>Already have an account? <Link className="btn btn-link" to="/login">Login</Link></small></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
  )
}

export default Register
