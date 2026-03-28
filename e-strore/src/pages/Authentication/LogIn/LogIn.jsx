import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../../shared/SocialLogin/SocialLogin';

const LogIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { logIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const onSubmit = data => {
        logIn(data.email, data.password)
            .then(result => {
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
    <div className="flex items-center justify-center px-3 sm:px-6">
        
        <div className="card bg-base-100 w-full shadow-2xl">
        
        <div className="card-body grid justify-center">
            
            {/* Title */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-2 sm:mb-4">
            Please Login
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className='w-80'>
            <fieldset className="">

                {/* Email */}
                <div>
                <label className="label text-sm sm:text-base">Email</label>
                <input
                    type="email"
                    {...register('email')}
                    className="input input-bordered w-full h-10 sm:h-12 text-sm sm:text-base"
                    placeholder="Email"
                />
                </div>

                {/* Password */}
                <div>
                <label className="label text-sm sm:text-base">Password</label>
                <input
                    type="password"
                    {...register('password', {
                    required: true,
                    minLength: 6
                    })}
                    className="input input-bordered w-full h-10 sm:h-12 text-sm sm:text-base"
                    placeholder="Password"
                />
                </div>

                {/* Errors */}
                {errors.password?.type === 'required' && (
                <p className='text-red-500 text-xs sm:text-sm'>
                    Password is required
                </p>
                )}
                {errors.password?.type === 'minLength' && (
                <p className='text-red-500 text-xs sm:text-sm'>
                    Password must be 6+ characters
                </p>
                )}

                {/* Forgot */}
                <div className="text-right">
                <a className="link link-hover text-xs sm:text-sm">
                    Forgot password?
                </a>
                </div>

                {/* Button */}
                <button className="btn btn-primary text-black mt-2 sm:mt-4 w-full h-10 sm:h-12 text-sm sm:text-base">
                Login
                </button>

            </fieldset>

            {/* Register */}
            <p className="text-center mt-3 sm:mt-4 text-xs sm:text-sm">
                New to this website?{" "}
                <Link className="btn btn-link p-0 text-xs sm:text-sm" to="/register">
                Register
                </Link>
            </p>
            </form>

            {/* Social */}
            <div className="">
            <SocialLogin />
            </div>

        </div>
        </div>
    </div>
    );
};

export default LogIn;