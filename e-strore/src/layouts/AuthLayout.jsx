import React from 'react';
import { Link, Outlet } from 'react-router';
import Logo from '../pages/shared/Logo/Logo';
import login from "../assets/Authentication/login.png"


const AuthLayout = () => {
    return (
        <div className="p-12 bg-base-200">
            <div>
                <Link to="/"><Logo></Logo></Link>
            </div>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='flex-1'>
                    <img
                        src={login}
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                </div>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;