import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import styled, { keyframes } from "styled-components";
import Link from "next/link";


export const Wrapper = styled.div`
	height: calc(100vh - 4rem);
	display: flex;
`;

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	padding: 0rem 4rem;

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
`

export const Left = styled.div`
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	justify-content: center;
	width: 60vw;
	max-width: 800px;

	@media (max-width: 768px) {
		width: 100vw;
		padding: 0rem 2rem;
	}
`

export const Right = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: calc(40vw-8rem);
	max-width: 600px;
	

	@media (max-width: 768px) {
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`

export const StartCreatingButton = styled.button`
    background-color: ${props => props.theme.colors.button};
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

	@media (max-width: 768px) {
		// width: unset;
		// padding: 1rem 6rem;
		padding: 1rem 0rem;
		width: 80vw;
		margin-top: -2rem;
	}
`

export const Input = styled.input`
	color: black;
	padding: 1rem 0rem;
	padding-left: 1.5rem;
	width: calc(100% - 1rem);
	border: 1px solid black;
	border-radius: 50px;
	font-family: Inter;
	font-size: clamp(1.25rem, 2vw, 2rem);
	letter-spacing: -0.05em;
	white-space: nowrap;

	&::placeholder {
		color: grey;
	}

	@media (max-width: 768px) {
		// width: unset;
		// padding: 1rem 6rem;
		padding: 1rem 0rem;
		width: 100%;
		margin-top: -2rem;
	}
`

export const ImageContainer = styled.div`
`

const GeneratePage = () => {
	const [hasMounted, setHasMounted] = useState(false);
	const [prompt, setPrompt] = useState("");
	const [result, setResult] = useState("");

	useEffect(() => {

		// Prevents hydration issues
		setHasMounted(true);
	  }, []);
	
	  if (!hasMounted) {
		return null;
	  }
	
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

	const handleClick = () => {
		generateImage();
	};

	return (
		<Wrapper>
			<Container>
				<Left>
					<ImageContainer>
						{result.length > 0
						? result.map((url, index) => (
							<img
								key={index}
								src={url || ""}
								alt={`result ${index}`}
							/>
						))
						: ""}
					</ImageContainer>
					<Input
						placeholder="prompt"
						name="prompt"
						type="text"
						onChange={(event) => {
							setPrompt(event.target.value);
						}}
					/>
				</Left>
				<Right>
					<StartCreatingButton onClick={handleClick}>
							Generate
					</StartCreatingButton>
				</Right>
			</Container>
		</Wrapper>
	);
};

export default GeneratePage;