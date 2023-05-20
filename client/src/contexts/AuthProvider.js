import React, { createContext } from 'react';
import app from '../firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);


const authInfo = {
    
}
const AuthProvider = ({children}) => {
   return <AuthContext.Provider value={authInfo}>
    {children}
   </AuthContext.Provider>
};

export default AuthProvider;