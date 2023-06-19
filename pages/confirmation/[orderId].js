import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";

export const Wrapper = styled.div`
	display: flex;
	height: 100vh;
	width: 100vw;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const OrderNumberContainer = styled.div`
	background-color: black;
	color: white;
	padding: 5px 20px;
	border-radius: 50px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin-bottom: 1rem;
`;

export const CreateMoreArtButton = styled.button`
	background-color: ${(props) => props.theme.colors.button};
	color: black;
	padding: 1rem 0rem;
	width: 30vw;
	max-width: 500px;
	border: 1px solid black;
	border-radius: 50px;
	font-family: InterBlack;
	font-size: clamp(1.25rem, 2vw, 2rem);
	letter-spacing: -0.05em;
	white-space: nowrap;
	cursor: pointer;
	transition: 0.2s;
	will-change: transform;

	&:hover {
		transform: translate(-1%, -1%) scale(1.01);
		background: ${(props) => props.theme.colors.button};
		box-shadow: 0.25rem 0.25rem black;
	}

	&:active {
		transform: translate(0%, -0%) scale(1);
		box-shadow: none;
	}

	@media (max-width: 768px) {
		// width: unset;
		// padding: 1rem 6rem;
		padding: 1rem 0rem;
		width: 80vw;
		// margin-top: -2rem;
	}
`;

export const Main = styled.h3`
	font-family: InterLight;
	font-size: clamp(2.5rem, 5vw, 5rem);
	white-space: nowrap;
	font-weight: 100;
	line-height: 1;
	text-align: center;
	color: black;
	margin-bottom: 1rem;
`;

export const OrderNumber = styled.h3`
	font-family: DMSerifDisplay;
	font-size: clamp(1rem, 4vw, 3rem);
	white-space: nowrap;
	font-weight: 100;
	text-align: center;
	color: white;
`;

export const MainSerif = styled.h3`
	font-family: DMSerifDisplayItalic;
	font-size: clamp(2.5rem, 7.25vw, 5.25rem);
	line-height: 0.85;
	font-weight: 100;
	text-align: center;
	color: black;
`;

export const Sub = styled.h5`
	font-family: InterExtraLight;
	font-size: clamp(0.5rem, 3vw, 1rem);
	color: black;
	text-align: center;
	margin-bottom: 1rem;
`;

export const SubMobile = styled.h5`
	font-family: InterExtraLight;
	font-size: clamp(0.5rem, 3vw, 1rem);
	color: black;
`;

const Confirmation = () => {
	const [orderId, setOrderId] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setOrderId(window.location.href.split("/")[4].split("?")[0]);
	}, []);

	useEffect(() => {
		if (orderId !== "") {
			setLoading(false);
		}
	}, [orderId]);

	return (
		<Wrapper>
			<OrderNumberContainer>
				<OrderNumber>Order Number&nbsp;</OrderNumber>
				<OrderNumber>{loading ? "Loading" : orderId}</OrderNumber>
			</OrderNumberContainer>
			<MainSerif>Thank you for your order!</MainSerif>
			<Main>Your order is on its way</Main>
			<Sub>
				You can chek the status of your order any time by logging into your account. If
				you have any questions or need assistance, please email us at blah@blah.biz
			</Sub>
			<Link href="/generate">
				<CreateMoreArtButton>Create More Art</CreateMoreArtButton>
			</Link>
		</Wrapper>
	);
};

export default Confirmation;
