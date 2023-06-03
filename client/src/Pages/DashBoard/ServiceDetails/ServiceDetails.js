import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import ServiceDetail from './ServiceDetail';
import BookingModal from './BookoingModal/BookingModal';

const ServiceDetails = () => {
    const serviceDetails = useLoaderData();
    const [serviceBooking,setServiceBooking] = useState(null);

    return (
        <div>
             <h1 className='text-4xl font-semibold text-center my-5'>Services Available</h1>
             <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-5 container mx-auto'>
             {
                serviceDetails?.map(service =><ServiceDetail
                key={service._id}
                service={service}
                setServiceBooking={setServiceBooking}></ServiceDetail>)
             }   
             </div> 
             {
                serviceBooking && 
                <BookingModal
                serviceBooking={serviceBooking}
                setServiceBooking={setServiceBooking}></BookingModal>
             }
        </div>
    );
};

export default ServiceDetails;