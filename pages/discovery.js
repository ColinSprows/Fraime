import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";
import AppContext from "@/components/AppContext";
import { Configuration, OpenAIApi } from "openai";
import styled, { keyframes } from "styled-components";
import Link from "next/link";

export const Wrapper = styled.div`
	height: calc(100vh - 4rem);
	display: flex;
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
	padding: 10px; // Adjust the padding to move the top left button away from the edge.
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0;
	transition: opacity 0.3s ease;
`;

export const CenterButton = styled.button`
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

	&:hover {
		opacity: 0.8;
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

const DiscoveryPage = () => {
	const [hasMounted, setHasMounted] = useState(false);
	const { context, setContext } = useContext(AppContext);
	const [prompt, setPrompt] = useState(context.prompt);
	const [result, setResult] = useState("");

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
	};

	useEffect(() => {
		// Prevents hydration issues
		setHasMounted(true);
		// generateImage();
		setResult([
			"https://oaidalleapiprodscus.blob.core.windows.net/private/org-sMYqIiwDshw3aO1opcm1AbvS/user-vtY89k69nBTPMZUF63doQkH7/img-2wi8dMzmEuyGAeyA9cg7Wjcy.png?st=2023-05-20T15%3A32%3A27Z&se=2023-05-20T17%3A32%3A27Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-20T01%3A47%3A58Z&ske=2023-05-21T01%3A47%3A58Z&sks=b&skv=2021-08-06&sig=m35sUnMgUDc4ILlhG5xbqcriWn%2BBE7Ou1wjX2cThpxM%3D&w=2048&q=7",
			"https://oaidalleapiprodscus.blob.core.windows.net/private/org-sMYqIiwDshw3aO1opcm1AbvS/user-vtY89k69nBTPMZUF63doQkH7/img-2wi8dMzmEuyGAeyA9cg7Wjcy.png?st=2023-05-20T15%3A32%3A27Z&se=2023-05-20T17%3A32%3A27Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-20T01%3A47%3A58Z&ske=2023-05-21T01%3A47%3A58Z&sks=b&skv=2021-08-06&sig=m35sUnMgUDc4ILlhG5xbqcriWn%2BBE7Ou1wjX2cThpxM%3D&w=2048&q=75",
		]);
		console.log("generateImage");
	}, []);

	if (!hasMounted) {
		return null;
	}

	const handleClick = () => {
		// generateImage();
		console.log("clicked");
	};

	return (
		<Wrapper>
			<ImageContainer>
				{result.length > 0
					? result.map((url, index) => (
							<ImageEl key={index}>
								<Image key={index} src={url || ""} alt={`result ${index}`} fill />
								<HoverButtons>
									<Link href="/product">
										<CenterButton>Buy</CenterButton>
									</Link>
									<TopRightButton>
										<Image
											src="/page-flip.svg"
											alt="page flip icon"
											height={35}
											width={35}
										/>
									</TopRightButton>
								</HoverButtons>
							</ImageEl>
					  ))
					: ""}
			</ImageContainer>
			<StaticContainer>
				<Left>
					<Link href="/generate">
						<RePromptButton>Re-Prompt</RePromptButton>
					</Link>
				</Left>
				<Right>
					<InputWrapper>
						<Input placeholder={prompt} name="prompt" type="text" readOnly={true} />
						<IconWrapper onClick={() => handleClick()}>
							<Image src="/repeat-solid.svg" alt="rotate icon" fill />
						</IconWrapper>
					</InputWrapper>
				</Right>
			</StaticContainer>
		</Wrapper>
	);
};

export default DiscoveryPage;
