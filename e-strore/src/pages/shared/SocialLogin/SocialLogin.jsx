import React from 'react'
import { FaGoogle } from "react-icons/fa";
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router';

const SocialLogin = () => {
    const {user, googleSignIn}=useAuth();
    const axiosPublic=useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
        .then((result) => {
            const user = result.user;
            console.log(user);
            navigate("/");
        })
        .catch((error) => {
            console.error(error);
        });
    };
  return (
    <div className="p-4">
      <div className="divider">OR</div>
      <div className="flex justify-center items-center">
        <button
        onClick={()=>handleGoogleSignIn()}
          className="btn btn-outline btn-accent"
        >
          <FaGoogle></FaGoogle>
          SignIn With Google
        </button>
      </div>
    </div>
  );
}

export default SocialLogin
