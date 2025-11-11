import React, { createContext, useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from '../firebase/firebase.init';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext=createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser]=useState(null);
    const [loading, setLoading]=useState(true);
    const provider = new GoogleAuthProvider();
    const axiosPublic=useAxiosPublic();

    const createUser=(email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn=(email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn=()=>{
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const updateUserProfile=(profileInfo)=>{
        return updateProfile(auth.currentUser, profileInfo);
    }

    const logOut=()=>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            console.log(currentUser);
            const userInfo={ email: currentUser?.email };
            if(currentUser){
                axiosPublic.post("/jwt", userInfo)
                .then(res=>{
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                        setLoading(false);
                    }
                })
            }else{
                localStorage.removeItem("access-token");
                setLoading(false);
            }
        });
        return ()=>{
            return unsubscribe();
        }
    },[axiosPublic])

    const authInfo={
        user,
        loading,
        createUser,
        logIn,
        googleSignIn,
        logOut,
        updateUserProfile
    }
  return (
    <AuthContext value={authInfo}>
      {children}
    </AuthContext>
  )
}

export default AuthProvider;
