import React, { useState, useEffect } from "react";
import {
	PaymentElement,
	LinkAuthenticationElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import styled from "styled-components";

export const CheckoutFormContainer = styled.div`
  margin: 2em auto;
  width: 60vw;
  max-width: 600px;
`


export const CheckoutTextContainer = styled.div`
  background-color: black;
  color: white;
  padding: 5px 20px;
  border-radius: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 1rem;
`

export const CheckoutText = styled.h3`
  font-family: DMSerifDisplay-Regular;
  font-size: clamp(1rem, 4vw, 3rem);
  white-space: nowrap;
  font-weight: 100;
  text-align: center;
  color: black;
`

export const StartCreatingButton = styled.button`
	background-color: ${(props) => props.theme.colors.button};
	color: black;
	padding: 1rem 0rem;
	width: 100%;
	border: 1px solid black;
	border-radius: 50px;
	font-family: InterBlack;
	font-size: clamp(1.25rem, 2vw, 2rem);
	letter-spacing: -0.05em;
	white-space: nowrap;
	cursor: pointer;
	transition: 0.2s;
	will-change: transform;
  margin-top: 1em;

	&:hover {
		transform: translate(-1%, -1%) scale(1.01);
		background: ${(props) => props.theme.colors.button};
		box-shadow: 0.25rem 0.25rem black;
	}

	&:active {
		transform: translate(0%, -0%) scale(1);
		box-shadow: none;
	}
`;

function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();

	const [email, setEmail] = useState("");
	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case "succeeded":
					setMessage("Payment succeeded!");
					break;
				case "processing":
					setMessage("Your payment is processing.");
					break;
				case "requires_payment_method":
					setMessage("Your payment was not successful, please try again.");
					break;
				default:
					setMessage("Something went wrong.");
					break;
			}
		});
	}, [stripe]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js hasn't yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// Make sure to change this to your payment completion page
				return_url: "http://localhost:3001/confirmation",
			},
		});

		// This point will only be reached if there is an immediate error when
		// confirming the payment. Otherwise, your customer will be redirected to
		// your `return_url`. For some payment methods like iDEAL, your customer will
		// be redirected to an intermediate site first to authorize the payment, then
		// redirected to the `return_url`.
		if (error.type === "card_error" || error.type === "validation_error") {
			setMessage(error.message);
		} else {
			setMessage("An unexpected error occurred.");
		}

		setIsLoading(false);
	};

	const paymentElementOptions = {
		layout: "tabs",
	};

  return (
    <CheckoutFormContainer>
        <CheckoutText>Checkout</CheckoutText>
      <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(e) => setEmail(e.target.value)}
        />
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <StartCreatingButton disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </StartCreatingButton>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </CheckoutFormContainer>
  );
}

export default CheckoutForm;
