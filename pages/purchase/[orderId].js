import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

// REFERENCE
// https://stripe.com/docs/payments/quickstart

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function Purchase() {
	const [clientSecret, setClientSecret] = useState("");
	const [order, setOrder] = useState(null);

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		fetch("/api/purchase", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				items: {
					prompt_id: "648a276b7f94057980f986cc",
					image_id: "648a276d7f94057980f986ce",
					product_type: "Print",
					product_size: '12"x12"',
					paper_type: "Glossy",
					framing_type: "Frame",
					framing_options: '1", Black',
					mat_options: "No Mat",
				},
			}),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, []);

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
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			)}
		</div>
	);
}

export default Purchase;
