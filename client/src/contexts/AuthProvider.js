import React, { createContext, useState } from "react";
import app from "../firebase/firebase.config";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

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
  const authInfo = {
    user,
    createUser,
    updateUser,
    providerLogin,
    signIn
  };
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
