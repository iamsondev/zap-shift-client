import { CardCvcElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!stripe || !elements){
      return;
    }

    const card = elements.getElement(CardCvcElement);
    if(card === null){
      return;
    }


  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
       <button className='btn' type="submit" disabled={!stripe}>
         Pay
      </button>
      </form>
    </div>
  );
};

export default PaymentForm;