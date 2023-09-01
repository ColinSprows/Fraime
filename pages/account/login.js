import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { signIn } from "../../utils/authHandler";

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
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		const response = await signIn(email, password);
		console.log("login", response);
		if (response.success) {
			window.location.href = "/";
		} else {
			alert(response);
		}
	};

	return (
		<Wrapper>
			<div>login</div>
			<Input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
			<Input
				type="password"
				placeholder="password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Button onClick={() => handleLogin()}>login</Button>
			<span>
				Don't have an account?
				<StyledLink href="/account/signup">Sign Up</StyledLink>
			</span>
		</Wrapper>
	);
}
