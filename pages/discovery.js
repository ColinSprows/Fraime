import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useImageContext, usePromptContext } from "../context/ContextProvider";
import { Configuration, OpenAIApi } from "openai";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "../components/sub-components/loading";

export const Wrapper = styled.div`
	height: calc(100vh - 4rem);
	display: flex;
`;

export const LoadingContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

export const StaticContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	padding: 0rem 4rem;
	position: fixed;
	bottom: 0;
	margin-bottom: 2rem;

	@media (max-width: 768px) {
		flex-direction: column;
		padding: 0rem 0rem;
		align-items: center;
		justify-content: center;
	}

	@media (min-width: 1600px) {
		justify-content: center;
		width: 100%;
	}
`;

export const Left = styled.div`
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	justify-content: center;
	width: calc(40vw-8rem);

	@media (max-width: 768px) {
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

export const Right = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 60vw;

	@media (max-width: 768px) {
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

export const RePromptButton = styled.button`
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
		letter-spacing: 0em;
	}

	&:active {
		letter-spacing: -0.05em;
	}

	@media (max-width: 768px) {
		max-width: 800px;
		padding: 1rem 0rem;
		width: 80vw;
		margin-bottom: 1rem;
	}
`;

export const InputWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	position: relative;

	@media (max-width: 768px) {
		width: 100vw;
		display: flex;
		height: 100%;
		justify-content: center;
		align-items: center;
	}
`;

export const IconWrapper = styled.div`
	position: absolute;
	width: 3vw;
	height: 3vw;
	right: 35px;
	top: 50%;
	transform: translateY(-50%);
	cursor: pointer;

	@media (max-width: 768px) {
		width: 5vw;
		height: 5vw;
		min-width: 50px;
		right: 12vw;
		top: 50%;
		transform: translateY(-50%);
	}
`;

export const Input = styled.input`
	color: black;
	padding: 1rem 0rem;
	padding-left: 1.5rem;
	padding-right: 1.5rem;
	width: calc(100% - 1rem);
	border: 1px solid black;
	border-radius: 50px;
	font-family: Inter;
	font-size: clamp(1.25rem, 2vw, 2rem);
	letter-spacing: -0.05em;
	white-space: nowrap;
	display: ${({ inputFade }) => (inputFade ? "none" : "flex")};

	&::placeholder {
		color: grey;
	}

	&[readonly] {
		cursor: not-allowed;
		pointer-events: none;
		background-color: lightgray;
	}

	@media (max-width: 768px) {
		padding: 1rem 0rem;
		padding-left: 1rem;
		width: 80vw;
	}
`;

export const ImageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: auto;

	& > :first-child {
		margin-top: 4rem;
	}

	& > :last-child {
		margin-bottom: 8rem;
	}

	@media (max-width: 768px) {
		& > :first-child {
			margin-top: 0rem;
		}

		& > :last-child {
			margin-bottom: 12rem;
		}
	}
`;

export const HoverButtons = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0;
	transition: opacity 0.3s ease;
`;

export const BuyButton = styled.button`
	position: absolute;
	top: 50%;
	left: 50%;
	width: 30%;
	font-family: InterBlack;
	font-size: clamp(1.25rem, 2vw, 2rem);
	letter-spacing: -0.05em;
	white-space: nowrap;
	cursor: pointer;
	transform: translate(-50%, -50%);
	background-color: ${(props) => props.theme.colors.button};
	color: black;
	border: 1px solid black;
	border-radius: 50px;
	padding: 1rem 0rem;
	transition: 0.2s;
	will-change: transform;

	&:hover {
		transform: translate(-51%, -51%) scale(1.03);
		background: ${(props) => props.theme.colors.button};
		box-shadow: 0.25rem 0.25rem black;
	}

	&:active {
		transform: translate(-50%, -50%) scale(1);
		box-shadow: none;
	}
`;

export const TopRightButton = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	// transform: translate(-10%, 20%); // to add some margin from top left edge
`;

export const ImageEl = styled.div`
	width: 40vw;
	height: 40vw;
	position: relative;
	margin: 2rem 0rem;
	transform-style: preserve-3d;
	transition: transform 0.6s;
	transform: ${({ flipped }) => (flipped ? "rotateY(180deg)" : "rotateY(0deg)")};

	&:hover {
		.generatedImage {
			opacity: 0.8;
		}
	}

	&:hover ${HoverButtons} {
		opacity: 1;
	}

	@media (max-width: 768px) {
		width: 100vw;
		height: 100vw;
		margin: 0rem 0rem;
	}
`;

export const Back = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	backface-visibility: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	transform: rotateY(180deg);
`;

export const FlipBackButton = styled.button`
	position: absolute;
	top: 10px;
	right: 10px;
`;

export const BackPromptContainer = styled.div`
	position: relative;
`;

export const BackPrompt = styled.h3`
	font-family: InterBold;
	font-size: clamp(1.25rem, 2vw, 2rem);
	color: black;
`;

export const GeneratedImage = styled(Image).attrs({
	className: "generatedImage",
})`
	opacity: 1;
	transition: opacity 0.3s ease;
	backface-visibility: hidden;
	// border-radius: 12px;
`;

export const GeneratedImageBack = styled(Image)`
	opacity: 1;
	transition: opacity 0.3s ease;
	backface-visibility: hidden;
	transform: scaleX(-1);
`;

const DiscoveryPage = () => {
	const { promptInfo, setPromptInfo } = usePromptContext();
	const { selectedImage, setSelectedImage } = useImageContext();
	const [prompt, setPrompt] = useState(promptInfo.prompt);
	const [result, setResult] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isFlipped, setIsFlipped] = useState([]);
	const [hasMounted, setHasMounted] = useState(false);

	const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
	const configuration = new Configuration({ apiKey: apiKey });
	const openai = new OpenAIApi(configuration);

	const generateImage = async () => {
		const response = await fetch("/api/image/generateImage", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ prompt: prompt }),
		});
		const data = await response.json();
		setResult(data.urls);
		setIsLoading(false);
	};

	useEffect(() => {
		// Prevents hydration issues
		setHasMounted(true);
	}, []);

	useEffect(() => {
		// setIsLoading(true);
		// generateImage();
		setResult(["https://i.imgur.com/E8QwDMM.png", "https://i.imgur.com/E8QwDMM.png"]);
	}, [hasMounted]);

	// to be called on click of Buy or on click of fine tune
	const saveImage = async (url) => {
		const response = await fetch("/api/image/saveImage", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ url: url, prompt_id: promptInfo.prompt_id }),
		});
		const data = await response.json();
		console.log(data.image._id);
		setSelectedImage({ url, image_id: data.image._id });

		const journeyResponse = await fetch("/api/journey/createJourney", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				image_id: data.image._id,
				prompt_id: promptInfo.prompt_id,
			}),
		});
		const journeyData = await journeyResponse.json();
		console.log(journeyData);

    // update journey in local storage
    localStorage.setItem
	};

	// to check that selectedImage is updated due to async nature nature of setSelectedImage
	// useEffect(() => {
	// 	console.log(selectedImage);
	// }, [selectedImage]);

	const handleReRollClick = () => {
		// generateImage();
		console.log("clicked");
	};

	const router = useRouter();

	// handles routing after async function instead of Link
	const handleBuyClick = async (url) => {
		await saveImage(url);
		router.push("/product");
	};

	// const handleFlipClick = (index) => {
	// 	if (isFlipped.includes(index)) {
	// 	    setIsFlipped(prevState => prevState.filter(item => item !== index));
	// 	} else {
	// 	    setIsFlipped(prevState => [...prevState, index]);
	// 	}
	// };

	// const handleFlipBackClick = (index) => {
	// 	setIsFlipped((prevState) => prevState.filter((item) => item !== index));
	// };

	return (
		<Wrapper>
			{isLoading ? (
				<LoadingContainer>
					<Loading />
				</LoadingContainer>
			) : (
				<ImageContainer>
					{result.length > 0
						? result.map((url, index) => (
								<ImageEl key={index} flipped={isFlipped.includes(index)}>
									<GeneratedImage
										key={index}
										src={url || ""}
										alt={`result ${index}`}
										fill
									/>
									{/* <Back>
									{isFlipped.includes(index) && (
										<div>
											<GeneratedImageBack key={index} src={url || ""} alt={`result ${index}`} fill />							
											<BackPromptContainer><BackPrompt>{promptInfo.prompt}</BackPrompt></BackPromptContainer>
											<TopRightButton onClick={() => handleFlipBackClick(index)}>
												<Image
													src="/page-flip.svg"
													alt="page flip icon"
													height={35}
													width={35}
												/>
											</TopRightButton>
										</div>
									)}
								</Back> */}
									{!isFlipped.includes(index) && (
										<HoverButtons>
											{/* <Link href="/product"> */}
											<BuyButton onClick={() => handleBuyClick(url)}>Buy</BuyButton>
											{/* </Link> */}
											{/* <TopRightButton onClick={() => handleFlipClick(index)}>
											<Image
												src="/page-flip.svg"
												alt="page flip icon"
												height={35}
												width={35}
											/>
										</TopRightButton> */}
										</HoverButtons>
									)}
								</ImageEl>
						  ))
						: ""}
				</ImageContainer>
			)}
			<StaticContainer>
				<Left>
					<Link href="/generate">
						<RePromptButton>Re-Prompt</RePromptButton>
					</Link>
				</Left>
				<Right>
					<InputWrapper>
						<Input placeholder={prompt} name="prompt" type="text" readOnly={true} />
						<IconWrapper onClick={() => handleReRollClick()}>
							<Image src="/icons/repeat-solid.svg" alt="rotate icon" fill />
						</IconWrapper>
					</InputWrapper>
				</Right>
			</StaticContainer>
		</Wrapper>
	);
};

export default DiscoveryPage;
