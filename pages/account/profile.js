import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { currentAuthenticatedUser, signOut } from "@/utils/authHandler";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 400px;
	margin: 6rem auto;
`;

const AccountDetails = styled.div``;

const Detail = styled.div``;

const Button = styled.button``;

const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const Input = styled.input``;

export default function Profile() {
	const [changePassword, setChangePassword] = useState("");
	const [userEmail, setUserEmail] = useState("");

	const handleClick = () => {
		setChangePassword(true);
	};

	const handleLogout = () => {
		signOut();
		window.location.href = "/account/login";
	};

	useEffect(() => {
		const validateUser = async () => {
			const user = await currentAuthenticatedUser();
			if (!user) {
				window.location.href = "/account/login";
			} else {
				setUserEmail(user.attributes.email);
			}
		};
		validateUser();
	}, []);

	return (
		<Wrapper>
			<AccountDetails>
				<Detail>Email: {userEmail}</Detail>
				<Detail onClick={handleClick}>Change Password</Detail>
				{changePassword && (
					<InputWrapper>
						<Input type="password" placeholder="Old Password" />
						<Input type="password" placeholder="New Password" />
						<Button>Set new password</Button>
					</InputWrapper>
				)}
			</AccountDetails>
			<Button onClick={() => handleLogout()}>Logout</Button>
			<Button>Delete Account</Button>
		</Wrapper>
	);
}
