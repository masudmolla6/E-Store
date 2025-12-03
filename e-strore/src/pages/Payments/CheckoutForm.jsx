import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useCarts from "../../hooks/useCarts";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const [error, setError]=useState("");
  const [success, setSuccess]=useState("");
  const [clientSecret, setClientSecret]=useState("");
  const stripe=useStripe();
  const axiosSecure=useAxiosSecure();
  const [transaction, setTransaction]=useState();
  const navigate=useNavigate();
  const {user}=useAuth();
  const elements=useElements();
  const [carts, refetch]=useCarts();
  const totalPrice=carts.reduce((totall, item)=>item.price+totall, 0);

  console.log(clientSecret);


  useEffect(()=>{
    if(totalPrice>0){
      axiosSecure.post("/create-payment-intent", { price: totalPrice })
      .then((res)=>{
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
    }
  },[])


  const handleSubmit=async(event)=>{
    event.preventDefault();

    if(!stripe){
      return;
    }

    const card=elements.getElement(CardElement);
    
    if(card===null){
      return;
    }

      const { error, paymentMethod} = await stripe.createPaymentMethod({
        type: "card",
        card
      })

      if (error) {
        console.error("Error", error);
        setError(error.message);
      }
      else {
        console.log('paymentMethod', paymentMethod);
        setError("");
      }

    const {paymentIntent, error:confirmError}=await stripe.confirmCardPayment(
          clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.displayName || "anonymous",
              email:user?.email || "anonymous"
            }
          }
        }
    )

    if(confirmError){
      console.log("confirm Error", confirmError);
    }
    else{
      console.log("PaymentIntent", paymentIntent);
      if(paymentIntent.status === "succeeded"){
          console.log("transaction Id", paymentIntent.id);
          setTransaction(paymentIntent.id);

          // now save the payment in the database.
          const payment = {
            email: user?.email,
            price: totalPrice,
            transactionId:paymentIntent.id,
            date: new Date(),
            cartIds: carts.map(item => item._id),
            status:"pending"        
          }


          const res = await axiosSecure.post("/payments", payment);
          console.log("Payment Data Saved In the Database", res.data);
          refetch();
          if (res.data?.paymentsResults?.insertedId) {
            Swal.fire({
              title: `Thank You So Much For your Payment.`,
              icon: "success",
              draggable: true,
            });
            navigate("/dashboard/myCart")
          }

      }
    }


  }

  console.log(carts);
  return (
      <form onSubmit={handleSubmit} className="w-full">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-accent w-full text-lg"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-3xl text-red-600 text-center">{error}</p>
        {transaction && (
          <p className="text-3xl text-red-600 text-center">You Transacton id : { transaction}</p>
        )}
      </form>
  )
}

export default CheckoutForm;
