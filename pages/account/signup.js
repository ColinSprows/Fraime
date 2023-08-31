import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { signUp, confirmSignUp } from "../../utils/authHandler";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 400px;
	margin: 6rem auto;
`;

const Input = styled.input``;

const Button = styled.button``;

const StyledLink = styled(Link)``;

export default function login() {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [code, setCode] = useState("");

	const handleSubmit = async () => {
		const response = await signUp(email, password);
		console.log("signup", response);
		if (response.success) {
			setIsSubmitted(true);
		} else {
			alert(response);
		}
	};

	const handleConfirm = async () => {
		const response = await confirmSignUp(email, code);
		console.log("signup", response);
		if (response === "SUCCESS") {
			alert("Account created ");
			window.location.href = "/";
		} else {
			alert("error confirming sign up");
		}
	};

	return (
		<Wrapper>
			<div>Signup</div>
			<Input
				onChange={(e) => setEmail(e.target.value)}
				type="text"
				placeholder="email"
				disabled={isSubmitted}
			/>
			<Input
				onChange={(e) => setPassword(e.target.value)}
				type="password"
				placeholder="password"
				disabled={isSubmitted}
			/>
			{isSubmitted && (
				<div>
					<span>email sent, enter verification code below</span>
					<Input
						type="text"
						placeholder="verification code"
						onChange={(e) => setCode(e.target.value)}
					/>
					<Button onClick={() => handleConfirm()}>Confirm</Button>
				</div>
			)}
			{!isSubmitted && <Button onClick={() => handleSubmit()}>Signup</Button>}
		</Wrapper>
	);
}
