import React from 'react'
import { StripeData } from './StripeData';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


const PUBLIC_KEY = "pk_test_51LPMF4SGjWlrXrExPxxkzRsuWNjlNXjZ2PAt60wTOwRxMaRyxPYQXqa44zng8N8VC48i2GJLLQhgd5qd2wfubY1a004jwASc3y";

const stripeTestPromise = loadStripe(PUBLIC_KEY);
export const StripeDataForms = () => {
  return (
    <Elements stripe={stripeTestPromise}>
    <StripeData />
    </Elements>
  )
}
