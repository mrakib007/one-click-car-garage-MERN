import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';

const ManageServices = () => {
    const {user,logOut} = useContext(AuthContext);
    const [services,setServices] = useState([]);
    return (
        <div>
            
        </div>
    );
};

export default ManageServices;