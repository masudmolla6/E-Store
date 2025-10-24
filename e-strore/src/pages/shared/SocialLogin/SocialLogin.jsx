import React from 'react'
import { FaGoogle } from "react-icons/fa";
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2'

const SocialLogin = () => {
    const {user, googleSignIn}=useAuth();
    const axiosPublic=useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
  googleSignIn()
    .then((result) => {
      const user = result.user;
      console.log(user);

      const userInfo = {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL, // ✅ Fixed: should be user.photoURL, not "photoUrl"
      };

      axiosPublic.post("/users", userInfo)
        .then((res) => {
          console.log("User added to the database.");

          // ✅ handle both new & existing user
          if (res.data.insertedId) {
            Swal.fire({
              title: `Hey! ${user.displayName}, your account was created successfully! 🎉`,
              icon: "success",
              draggable: true,
            });
          } else {
            Swal.fire({
              title: `Welcome back, ${user.displayName}! 😎`,
              icon: "info",
            });
          }

          navigate("/");
        })
        .catch((error) => {
          console.error("Error adding user:", error);
        });
    })
    .catch((error) => {
      console.error("Google Sign-in failed:", error);
    });
};


    // const handleGoogleSignIn = () => {
    //     googleSignIn()
    //     .then((result) => {
    //         const user = result.user;
    //         console.log(user);
    //           const userInfo={
    //             name:user.displayName,
    //             email:user.email,
    //             photoUrl:user.photoUrl,
    //           }
    //         axiosPublic.post("/users", userInfo)
    //           .then(res=>{
    //             console.log("user added to the database.");
    //                 if (res.data.insertedId) {
    //                   Swal.fire({
    //                     title: `Hey! ${user.displayName} Your Account is Created Successfully!`,
    //                     icon: "success",
    //                     draggable: true,
    //                   });
    //                   navigate("/");
    //                 }
    //           })
    //           .catch(error=>{
    //             console.error(error);
                
    //           })
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
    // };
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
