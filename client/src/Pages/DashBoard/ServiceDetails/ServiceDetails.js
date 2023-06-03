import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import ServiceDetail from './ServiceDetail';

const ServiceDetails = () => {
    const serviceDetails = useLoaderData();
    const [serviceBooking,setServiceBooking] = useState(null);

    return (
        <div>
             <h1>Services Available</h1>
             <div className='grid lg:grid-cols-2 md:grid-cols-2'>
             {
                serviceDetails?.map(service =><ServiceDetail
                key={service._id}
                service={service}
                setServiceBooking={setServiceBooking}></ServiceDetail>)
             }   
             </div> 
        </div>
    );
};

export default ServiceDetails;