import { Auth, Hub } from "aws-amplify";

// Signup
export async function signUp(email, password) {
	try {
		console.log(email, password);
		const { user } = await Auth.signUp({
			username: email,
			password,
			autoSignIn: {
				enabled: true,
			},
		});
		console.log("auth", user);
		return user;
	} catch (error) {
		console.log("error signing up:", error);
		return error;
	}
}

//confirm after receiving code
export async function confirmSignUp(email, code) {
	try {
		const username = email;
		//doesn't allow doubled emails
		const response = await Auth.confirmSignUp(username, code, {
			forceAliasCreation: false,
		});
		console.log("auth", response);
		return response;
	} catch (error) {
		console.log("error confirming sign up", error);
	}
}

//Confirmation email resend
export async function resendConfirmationCode() {
	try {
		await Auth.resendSignUp(username);
		console.log("code resent successfully");
	} catch (err) {
		console.log("error resending code: ", err);
	}
}

//Auto sign in after sign up
export function listenToAutoSignInEvent() {
	Hub.listen("auth", ({ payload }) => {
		const { event } = payload;
		if (event === "autoSignIn") {
			const user = payload.data;
			// assign user
		} else if (event === "autoSignIn_failure") {
			// redirect to sign in page
		}
	});
}

//Sign in
export async function signIn() {
	try {
		const user = await Auth.signIn(username, password);
	} catch (error) {
		console.log("error signing in", error);
	}
}

//sign out
export async function signOut() {
	try {
		await Auth.signOut();
	} catch (error) {
		console.log("error signing out: ", error);
	}
}

//change password
export async function changePassword(oldPassword, newPassword) {
	try {
		const user = await Auth.currentAuthenticatedUser();
		const data = await Auth.changePassword(user, oldPassword, newPassword);
		console.log(data);
	} catch (err) {
		console.log(err);
	}
}

//Forgot Password
// Send confirmation code to user's email
export async function forgotPassword(username) {
	try {
		const data = await Auth.forgotPassword(username);
		console.log(data);
	} catch (err) {
		console.log(err);
	}
}

// Collect confirmation code and new password
export async function forgotPasswordSubmit(username, code, newPassword) {
	try {
		const data = await Auth.forgotPasswordSubmit(username, code, newPassword);
		console.log(data);
	} catch (err) {
		console.log(err);
	}
}

//Retrieve current authenticated user
export async function currentAuthenticatedUser() {
	try {
		const user = Auth.currentAuthenticatedUser({
			bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
		});
	} catch (err) {
		console.log(err);
	}
}
