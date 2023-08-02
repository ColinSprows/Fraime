import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "../components/sub-components/loading";

import { newImageHandler } from "@/utils/newImageHandler";
import { loadStorePrompt, loadStoreJourney } from "@/utils/storageHandler";

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

export const ImageEl = styled.div`
	width: 40vw;
	height: 40vw;
	position: relative;
	margin: 2rem 0rem;
	transform-style: preserve-3d;
	transition: transform 0.6s;

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
	const [promptInfo, setPromptInfo] = useState();
	const [journey, setJourney] = useState();
	console.log("journey", journey);
	const [result, setResult] = useState("");
	const [isLoading, setIsLoading] = useState(false);
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
			body: JSON.stringify({ prompt: promptInfo.prompt }),
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
		setIsLoading(true);
		// setResult(["https://i.imgur.com/E8QwDMM.png", "https://i.imgur.com/E8QwDMM.png"]);
		setPromptInfo(loadStorePrompt());
		setJourney(loadStoreJourney());
	}, [hasMounted]);

	useEffect(() => {
		if (promptInfo) {
			generateImage();
		}
	}, [promptInfo]);

	const handleReRollClick = () => {
		setIsLoading(true);
		generateImage();
		console.log("clicked");
	};

	const router = useRouter();

	// handles routing after async function instead of Link
	const handleBuyClick = async (url) => {
		await newImageHandler(url, loadStorePrompt().prompt_id, loadStoreJourney()._id);
		router.push("/product");
	};

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
								<ImageEl key={index}>
									<GeneratedImage
										key={index}
										src={url || ""}
										alt={`result ${index}`}
										fill
									/>
									<HoverButtons>
										<BuyButton onClick={() => handleBuyClick(url)}>Buy</BuyButton>
									</HoverButtons>
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
						<Input
							placeholder={promptInfo?.prompt}
							name="prompt"
							type="text"
							readOnly={true}
						/>
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
