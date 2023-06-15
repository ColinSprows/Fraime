// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import calculateOrderAmount from "../../../util/calculateOrderAmount.js";

// REFERENCE
// https://stripe.com/docs/payments/quickstart

export default async function handler(req, res) {
	const { items } = req.body;

	// Create a PaymentIntent with the order amount and currency
	const paymentIntent = await stripe.paymentIntents.create({
		amount: calculateOrderAmount(items),
		currency: "usd",
		automatic_payment_methods: {
			enabled: true,
		},
	});

	res.send({
		clientSecret: paymentIntent.client_secret,
		totalPrice: paymentIntent.amount,
	});
}
