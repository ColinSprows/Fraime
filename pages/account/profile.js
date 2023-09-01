import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { currentAuthenticatedUser, signOut, changePassword } from "@/utils/authHandler";

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
	// States for Password
	const [expandChangePassword, setExpandChangePassword] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	// States for User Email
	const [userEmail, setUserEmail] = useState("");

	// Password Functions
	const handleExpand = () => {
		setExpandChangePassword(true);
	};

	const handleChangePassword = async () => {
		if (oldPassword === newPassword) {
			alert("New password cannot be the same as old password");
			return;
		}
		await changePassword(oldPassword, newPassword);

		console.log("Password changed");
		setOldPassword("");
		setNewPassword("");
		setExpandChangePassword(false);
	};

	// Account Functions
	const handleLogout = async () => {
		await signOut();
		setUserEmail("");
		window.location.href = "/account/login";
	};

	// UseEffects
	// Validate if user is logged in
	useEffect(() => {
		const authenticate = async () => {
			const user = await currentAuthenticatedUser();
			console.log(user);
			if (user !== "The user is not authenticated") {
				setUserEmail(user.attributes.email);
			} else {
				window.location.href = "/account/login";
			}
		};
		authenticate();
	}, []);

	return (
		<Wrapper>
			<AccountDetails>
				<Detail>Email: {userEmail}</Detail>
				<Detail onClick={handleExpand}>Change Password</Detail>
				{expandChangePassword && (
					<InputWrapper>
						<Input
							onChange={(e) => setOldPassword(e.target.value)}
							type="password"
							placeholder="Old Password"
						/>
						<Input
							onChange={(e) => setNewPassword(e.target.value)}
							type="password"
							placeholder="New Password"
						/>
						<Button onClick={() => handleChangePassword()}>Set new password</Button>
					</InputWrapper>
				)}
			</AccountDetails>
			<Button onClick={() => handleLogout()}>Logout</Button>
			<Button>Delete Account</Button>
		</Wrapper>
	);
}
