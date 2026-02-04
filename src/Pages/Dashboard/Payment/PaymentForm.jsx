import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");

  // next day i start work from here for get data for specific id

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
      console.log("[PaymentMethod]", paymentMethod);
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
          Pay
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
