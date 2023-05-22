import Image from "next/image";
import React from "react";
import { usePromptContext } from "../context/ContextProvider";
import styled from "styled-components";
import Link from "next/link";

export const Wrapper = styled.div`
	height: calc(100vh - 4rem);
	display: flex;
`;

export const StaticContainer = styled.div`
	display: flex;
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
	width: 60vw;

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
	width: calc(40vw-8rem);

	@media (max-width: 768px) {
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

export const GenerateButton = styled.button`
	background-color: ${(props) => props.theme.colors.button};
	color: black;
	padding: 1rem 0rem;
	width: ${({ generateExpand }) => (generateExpand ? "100vw" : "30vw")};
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
	}
`;

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
	display: ${({ inputFade }) => (inputFade ? "none" : "flex")};

	&::placeholder {
		color: grey;
	}

	@media (max-width: 768px) {
		padding: 1rem 0rem;
		padding-left: 1rem;
		width: 80vw;
		margin-bottom: 1rem;
	}
`;

const GeneratePage = () => {
	const { promptInfo, setPromptInfo } = usePromptContext();

	// call to createPrompt api to save prompt in database
	const savePrompt = async () => {
		console.log(JSON.stringify(promptInfo.prompt));
		const response = await fetch("/api/prompt/createPrompt", {
			method: "POST",
			headers: {
				"`Co`ntent-Type": "application/json",
			},
			body: JSON.stringify(promptInfo.prompt),
		});
		const data = await response.json();
		console.log(data);
		setPromptInfo({ ...promptInfo, prompt_id: data.prompt._id });
	};

	return (
		<Wrapper>
			<StaticContainer>
				<Left>
					<Input
						placeholder="prompt"
						name="prompt"
						type="text"
						onChange={(event) => {
							setPromptInfo({ ...promptInfo, prompt: event.target.value });
						}}
					/>
				</Left>
				<Right>
					<Link href="/discovery">
						<GenerateButton onClick={() => savePrompt()}>Generate</GenerateButton>
					</Link>
				</Right>
			</StaticContainer>
		</Wrapper>
	);
};

export default GeneratePage;
