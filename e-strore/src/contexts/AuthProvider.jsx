import React, { createContext, useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.init';

export const AuthContext=createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser]=useState(null);
    const [loading, setLoading]=useState(true);

    const createUser=(email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn=(email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile=(profileInfo)=>{
        return updateProfile(auth.currentUser, profileInfo);
    }

    const logOut=()=>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth, curretUser =>{
            setUser(curretUser);
            console.log(curretUser);

        });
        return ()=>{
            return unsubscribe();
        }
    },[])

    const authInfo={
        user,
        loading,
        createUser,
        logIn,
        logOut,
        updateUserProfile
    }
  return (
    <AuthContext value={authInfo}>
      {children}
    </AuthContext>
  )
}

export default AuthProvider
