import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ booking }) => {
  console.log(booking);
  const { price, email, name, _id } = booking;
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // authorization: `bearer ${localStorage.getItem("accessToken")}`
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data.clientSecret));
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }
    setSuccess("");
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          cared: card,
          billing_details: {
            name: name,
            email: email,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      const payment = {
        price,
        transactionId: paymentIntent.id,
        email,
        bookingId: _id,
      };
      fetch("http://localhost:5000/payments", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          // authorization:`bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            setSuccess("Payment Successful!");
            setTransactionId(paymentIntent.id);
          }
        });
    }
    setProcessing(false);
  };
  return <>
  <form onSubmit={handleSubmit}>
    <CardElement
    options={{
        style:{
            base:{
                fontSize: '16px',
                color: '#424770',
                '::placeholder':{
                    color: '#aab7c4'
                },
            },
            invalid:{
                color: '#9e2146',
            },
        },
    }}>
        <button className="btn btn-sm mt-5 btn-secondary"
        type="submit"
        disabled={!stripe || !clientSecret || processing}>
            Pay
        </button>
    </CardElement>
  </form>
  <p className="text-red-500 text-2xl">{cardError}</p>
  {
    success && <div>
        <p className="text-green-500 text-xl">{success}</p>
        <p>Your Transaction Id is: <span className="font-bod">{transactionId}</span></p>
    </div>
  }
  </>;
};

export default CheckoutForm;
