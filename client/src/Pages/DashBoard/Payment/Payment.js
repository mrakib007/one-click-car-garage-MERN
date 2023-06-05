import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLoaderData, useNavigate } from 'react-router-dom';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import Loading from '../../../Shared/Loading/Loading';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const navigation = useNavigate();
    const booking = useLoaderData();
    if(navigation.state === 'loading'){
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='text-3xl text-center font-semibold'>Payment for {booking.serviceBooking}.
            Please Pay <strong className='text-primary'>{booking.price}tk</strong> through your stripe card.</h2>
           <div className='w-full my-10'>
            <Elements stripe = {stripePromise}>
              <CheckoutForm booking={booking}/>
            </Elements>
           </div>
        </div>
    );
};

export default Payment;