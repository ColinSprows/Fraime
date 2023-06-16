import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm.js";

// REFERENCE
// https://stripe.com/docs/payments/quickstart

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function Purchase() {
	const [clientSecret, setClientSecret] = useState("");
	const [orderTotal, setOrderTotal] = useState(0);
	const [order, setOrder] = useState(null);

	useEffect(() => {
		const getOrderAndTotal = async () => {
			// fetch request for getOrder
			try {
				const orderId = window.location.pathname.split("/")[2];
				const response = await fetch(`/api/order/${orderId}`);
				if (response.ok) {
					const { order, orderTotal } = await response.json();
					setOrder(order);
					setOrderTotal(orderTotal);
				} else {
					throw new Error("Failed to fetch order");
				}
			} catch (error) {
				console.log(error);
			}
		};

		getOrderAndTotal();
	}, []);

	useEffect(() => {
		// Create PaymentIntent as after order value received
		if (!order) return;
		const paymentIntent = async () => {
			try {
				const response = await fetch("/api/purchase", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ order }),
				});

				if (response.ok) {
					const data = await response.json();
					setClientSecret(data.clientSecret);
				} else {
					throw new Error("Failed to create payment intent");
				}
			} catch (error) {
				console.log(error);
			}
		};
		paymentIntent();
	}, [order]);

	const appearance = {
		theme: "stripe",
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<div className="App">
			{clientSecret && (
				<Elements options={options} stripe={stripePromise} key={clientSecret}>
					<CheckoutForm orderTotal={orderTotal} order_id={order._id} />
				</Elements>
			)}
		</div>
	);
}

export default Purchase;