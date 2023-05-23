import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUser = (userInfo) =>{
    return updateProfile(auth.currentUser,userInfo);
  }
  const providerLogin = (provider) =>{
    setLoading(true);
    return signInWithPopup(auth,provider);
  }
  const signIn = (email,password) =>{
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password);
  }

  const logOut = () =>{
    setLoading(true);
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,currentUser=>{
      console.log('observing user');
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  },[])
  const authInfo = {
    user,
    createUser,
    updateUser,
    providerLogin,
    signIn,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
