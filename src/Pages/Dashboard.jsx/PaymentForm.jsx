import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useTrackingLogger from "../../hooks/useTrackingLogger";

const PaymentForm = () => {
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { logTracking } = useTrackingLogger();

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

    try {
      // Create payment intent
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
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");

        // Record payment in DB
        const paymentData = {
          parcelId,
          paymentMethod: result.paymentIntent.payment_method_types[0],
          userEmail: user.email,
          tranxId: result.paymentIntent.id,
        };

        const paymentRes = await axiosSecure.post("/payments", paymentData);
        console.log('Payment response:', paymentRes.data);

        if (paymentRes.data?.success && paymentRes.data?.paymentInsert) {
          // ✅ Log tracking event
          await logTracking(
            parcelInfo.parcel.tracking_id,
            "paid",
            "Payment completed successfully"
          );

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
    } catch (err) {
      console.error("Payment error:", err);
      setError("Something went wrong with the payment. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white py-4 max-w-md mt-5 rounded-xl w-full shadow-md mx-auto">
      <CardElement className="p-2 border-rounded" />
      <button type="submit" disabled={!stripe} className="text-black btn bg-lime-300 w-full mx-auto mt-4">
        Pay ${amount}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default PaymentForm;
