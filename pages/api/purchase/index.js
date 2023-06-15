// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import calculateOrderAmount from "../../../util/calculateOrderAmount.js";

// REFERENCE
// https://stripe.com/docs/payments/quickstart

// Calculate the order total on the server to prevent
// people from directly manipulating the amount on the client
// Have I compromised this by using a utility file that also calculates thee total and is being used here?

export default async function handler(req, res) {
	const { order } = req.body;

	// Create a PaymentIntent with the order amount and currency
	const paymentIntent = await stripe.paymentIntents.create({
		amount: calculateOrderAmount(order) * 100,
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
