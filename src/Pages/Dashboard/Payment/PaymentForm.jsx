import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import useAuth from "../../../Hook/useAuth";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../../../Hook/useAxiosInstance";
import Swal from "sweetalert2";
import useUpdateTracking from "../../../Hook/useUpdateTracking";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const { user } = useAuth();
  const { parcelId } = useParams();
  const axiosSecure = useAxiosInstance();
  const navigate = useNavigate();
  const { updateTracking } = useUpdateTracking();
  const { isPending, data: parcelData = [] } = useQuery({
    queryKey: ["parcel", parcelId],
    enabled: !!parcelId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-lime-500"></span>
      </div>
    );
  }

  const amountInCent = parcelData.totalCost * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
    } else {
      setError("");
      try {
        // ✅ create payment intent
        const res = await axiosSecure.post("/create-payment-intent", {
          amountInCent,
          parcelId,
        });

        const clientSecret = res?.data?.clientSecret;

        // Step 3: Confirm card payment
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: user?.displayName,
              email: user?.email,
            },
          },
        });

        if (result.error) {
          setError(result.error.message);

          return;
        }

        if (result.paymentIntent.status === "succeeded") {
          setError("");

          const transactionId = result.paymentIntent.id;
          const paymentData = {
            parcelName: parcelData?.parcelName,
            parcelId,
            userName: user?.displayName,
            email: user?.email,
            amount: parcelData.totalCost,
            paymentMethod: result.paymentIntent.payment_method_types[0],
            cardType: paymentMethod.card.brand,
            transactionId,
          };
          const paymentRes = await axiosSecure.post("/payments", paymentData);

          if (paymentRes?.data?.paymentResult?.insertedId) {
            // post in parcel update for payment complete
            await updateTracking({
              trackingId: parcelData.trackingId,
              status: "Payment completed",
              details: `paid  by ${user.displayName}`,
              updated_by: `parcel updated by ${user.email}`,
            });

            Swal.fire({
              title: "Payment Successful!",
              html: `Transaction ID: <strong>${transactionId}</strong>`,
              icon: "success",
              confirmButtonColor: "#84cc16",
            }).then(() => {
              navigate("/dashboard/my-parcels");
            });
          }
        }
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  return (
    <div>
      <form className="space-y-4 max-w-md bg-white mx-auto shadow-2xl p-10 rounded-2xl mt-4 md:mt-10">
        <h2 className="text-center font-bold text-2xl">Pay For Your Parcel</h2>
        <div className="p-4 border rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-lime-400">
          <CardElement />
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          disabled={!stripe}
          className="btn w-full bg-lime-400 rounded-xl"
        >
          Pay ৳{parcelData.totalCost}
        </button>
        {error && (
          <p className="bg-red-200 text-red-900 rounded-xl px-4 py-2">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
