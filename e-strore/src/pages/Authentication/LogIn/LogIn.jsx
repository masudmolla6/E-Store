import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../../shared/SocialLogin/SocialLogin';

const LogIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {user, logIn}=useAuth();

    const onSubmit = data => {
          logIn(data.email, data.password)
          .then(result=>{
            const user=result.user;
            console.log(user);
          })
          .catch(error=>{
            console.error(error);
          })
    }

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Please Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">

                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            className="input" placeholder="Email" />


                        <label className="label">Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: true,
                                minLength: 6
                            })}
                            className="input" placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password Must be 6 characters or longer</p>
                        }

                        <div><a className="link link-hover">Forgot password?</a></div>

                        <button className="btn btn-primary text-black mt-4">Login</button>
                    </fieldset>
                    <p><small>New to this website? <Link className="btn btn-link" to="/register">Register</Link></small></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default LogIn;