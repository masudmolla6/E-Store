import { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = ({ price }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // Step 1: Create PaymentIntent
  useEffect(() => {
    if (price > 0) {
      fetch("/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: price })
      })
        .then(res => res.json())
        .then(data => setClientSecret(data.clientSecret));
    }
  }, [price]);

  // Step 2: Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card }
      }
    );

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    setSuccess(true);
    setProcessing(false);
  };

  if (success) {
    return (
      <div className="p-4 bg-green-100 rounded-lg text-center">
        <h2 className="text-xl font-semibold">Payment Successful 🎉</h2>
        <p>Your order has been placed.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold">Checkout</h2>

      <div className="p-3 border rounded">
        <CardElement />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        disabled={!stripe || !clientSecret || processing}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {processing ? "Processing..." : `Pay $${price}`}
      </button>

      <p className="text-xs text-gray-400 mt-2">
        Test card: 4242 4242 4242 4242
      </p>
    </form>
  );
};

export default CheckoutForm;
