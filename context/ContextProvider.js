import { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();
const PromptContext = createContext();
const ImageContext = createContext();

export function useAppContext() {
	return useContext(AppContext);
}
export function usePromptContext() {
	return useContext(PromptContext);
}
export function useImageContext() {
	return useContext(ImageContext);
}

export function ContextProvider({ children }) {
	const [session, setSession] = useState(null);
	const [promptInfo, setPromptInfo] = useState({
		prompt: "this is a test. a prompt might go here.",
		prompt_id: "646beeab7ef876f7926a6dd9",
	});
	const [selectedImage, setSelectedImage] = useState({
		url: null,
		image_id: null,
	});

	// useEffect(() => {
	// 	const image = localStorage.getItem("selectedImage");
	// 	if (image) {
	// 		setSelectedImage(image);
	// 	}
	// }, []);

	// const selectImage = (url) => {
	// 	setSelectedImage(url);
	// 	localStorage.setItem("selectedImage", url);
	// };

	return (
		<AppContext.Provider value={{ session, setSession }}>
			<PromptContext.Provider value={{ promptInfo, setPromptInfo }}>
				<ImageContext.Provider value={{ selectedImage, setSelectedImage }}>
					{children}
				</ImageContext.Provider>
			</PromptContext.Provider>
		</AppContext.Provider>
	);
}
