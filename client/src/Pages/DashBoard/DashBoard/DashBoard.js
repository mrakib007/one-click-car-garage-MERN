import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';

const DashBoard = () => {
    const {user,loading} = useContext(AuthContext);
    if(loading){
        <progress className='progress w-56'></progress>
    }
    console.log(user)
    return (
        <div>
            <h1 className='text-3xl p-2 my-5 font-semibold'>Welcome {user?.displayName} to your dashboard </h1>
            <img className='w-3/4' src={'https://images.unsplash.com/photo-1580191947416-62d35a55e71d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80'} alt={'welcome photo'}></img>
        </div>
    );
};

export default DashBoard;