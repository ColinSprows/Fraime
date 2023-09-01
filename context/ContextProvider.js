import { createContext, useState, useContext, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";
import { currentAuthenticatedUser } from "@/utils/authHandler";

const AppContext = createContext();
const PromptContext = createContext();
const ImageContext = createContext();
const JourneyContext = createContext();
const LoginContext = createContext();

export function useAppContext() {
	return useContext(AppContext);
}
export function usePromptContext() {
	return useContext(PromptContext);
}
export function useImageContext() {
	return useContext(ImageContext);
}
export function useJourneyContext() {
	return useContext(JourneyContext);
}
export function useLoginContext() {
	return useContext(LoginContext);
}

export function ContextProvider({ children }) {
	const [session, setSession] = useState(null);
	const [promptInfo, setPromptInfo] = useState({
		prompt: "this is a test. a prompt might go here.",
		prompt_id: "646beeab7ef876f7926a6dd9",
	});
	const [selectedImage, setSelectedImage] = useState({
		url: "https://i.imgur.com/2iwDsuM.jpeg",
		image_id: "646beeab7ef876f7926a6dd9",
	});
	const [journey, setJourney] = useState({
		journey_id: "646beeab7ef876f7926a6d9",
	});

	// const [loginStatus, setLoginStatus] = useState(false);
	// // const [token, setToken] = useState("");
	// const [user, setUser] = useState(false);

	// // async function checkToken() {
	// // 	try {
	// // 		const session = await Auth.currentSession();
	// // 		const token = session.getAccessToken().getJwtToken();
	// // 		setToken(token);
	// // 	} catch (err) {
	// // 		console.log(err);
	// // 	}
	// // }

	// // useEffect(() => {
	// // 	checkToken();
	// // }, [loginStatus]);
	// console.log(Auth.currentCredentials());

	// Hub.listen("auth", (data) => {
	// 	switch (data.payload.event) {
	// 		case "signIn":
	// 			// console.log('user signed in');
	// 			setLoginStatus(true);
	// 			currentAuthenticatedUser().then((user) => {
	// 				setUser(user);
	// 			});
	// 			break;
	// 		case "signUp":
	// 			// console.log('user signed up');
	// 			setLoginStatus(false);
	// 			setUser(false);
	// 			break;
	// 		case "signOut":
	// 			// console.log('user signed out');
	// 			setLoginStatus(false);
	// 			setUser(false);
	// 			break;
	// 		case "signIn_failure":
	// 			// console.log('user sign in failed');
	// 			setLoginStatus(false);
	// 			setUser(false);
	// 			break;
	// 	}
	// });

	return (
		<AppContext.Provider value={{ session, setSession }}>
			<PromptContext.Provider value={{ promptInfo, setPromptInfo }}>
				<JourneyContext.Provider value={{ journey, setJourney }}>
					<ImageContext.Provider value={{ selectedImage, setSelectedImage }}>
						{children}
					</ImageContext.Provider>
				</JourneyContext.Provider>
			</PromptContext.Provider>
		</AppContext.Provider>
	);
}
