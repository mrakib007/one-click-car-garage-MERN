import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const ErrorPage = () => {
    const error = useRouteError();
    const errorImg = 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
    const {logOut} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () =>{
        logOut()
        .then(() =>{
            navigate('/login');
        })
        .catch(error => console.log(error));
    }
    return (
        <div>
            <img src={errorImg} className='w-1/2 m-auto my-10' alt="" />
            <h4 className='text-3xl text-center'>Please <button className='btn btn-danger' onClick={handleLogout}>Sign Out</button> and Sign back in</h4>
        </div>
    );
};

export default ErrorPage;