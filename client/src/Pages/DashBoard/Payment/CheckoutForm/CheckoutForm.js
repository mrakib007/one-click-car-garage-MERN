import { Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({booking}) => {
    console.log(booking)
    const {price,email,name,_id} = booking;
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret,setClientSecret] = useState('');
    useEffect(() =>{
        fetch('http://localhost:5000/create-payment-intent',{
            method: 'POST',
            headers:  {
                "Content-Type": "application/json",
                // authorization: `bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({price}),
        })
        .then((res) => res.json())
        .then((data)=> console.log(data.clientSecret));
    },[price])

    const handleSubmit = async(event) =>{
        event.preventDefault();
        if(!stripe || !elements){
            return;
        }
    }
    return (
        <div>
            
        </div>
    );
};

export default CheckoutForm;