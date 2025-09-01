import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { isLoading, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isLoading) return <span className="loading loading-dots loading-xl"></span>;

  const amount = parcelInfo.parcel?.deliveryCost || 0;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: stripeError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (stripeError) {
      setError(stripeError.message);
      return;
    } else setError("");

    // create payment intent
    const res = await axiosSecure.post("/create-payment-intent", { amountInCents });
    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: { email: user.email },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      console.log("payment succeed!");

      // record payment
      const paymentData = {
        parcelId,
        paymentMethod: result.paymentIntent.payment_method_types[0],
        userEmail: user.email,
        tranxId: result.paymentIntent.id,
      };

      const paymentRes = await axiosSecure.post("/payments", paymentData);
      console.log('Full payment response:', paymentRes.data);
      console.log('Inserted payment:', paymentRes.data.paymentInsert);
      if (paymentRes.data?.success && paymentRes.data?.paymentInsert) {
        Swal.fire({
          title: 'Payment Successful!',
          html: `Transaction ID: <strong>${result.paymentIntent.id}</strong>`,
          icon: 'success',
          confirmButtonText: 'Go to My Parcels'
        }).then(() => {
          navigate('/dashboard/myParcels'); 
        });
      }


    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white py-4 max-w-md mt-5 rounded-xl w-full shadow-md mx-auto">
      <CardElement className="p-2 border-rounded" />
      <button type="submit" disabled={!stripe} className="text-black btn bg-lime-300 w-full mx-auto">
        Pay ${amount}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default PaymentForm;
