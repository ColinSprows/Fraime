import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { newPromptHandler } from '@/utils/newPromptHandler';


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
	background: white;

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

export const Gallery = styled.div`
	display: grid;
	align-items: flex-start;
	grid-template-columns: repeat(3, 1fr);
	grid-auto-rows: 1fr;
	gap: 0rem;
	z-index: 0;

	@media (max-width: 827px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 480px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;

export const ImageOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 10px 0px;
	background: rgba(0, 0, 0, 0.5); // black overlay with opacity
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	opacity: 0;
	transition: opacity 0.3s ease;
	z-index: 1;
`;

export const OverlayText = styled.h3`
	color: white;
	font-size: 1rem;
	padding: 0 10px;
	font-family: InterLight;
	font-size: clamp(1rem, 1.8vw, 4rem);
	font-weight: 100;
	line-height: 0.9;
	text-align: left;
`;

export const ImageContainer = styled.div`
	position: relative;
	max-width: 100%;
	aspect-ratio: 1/1;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover ${ImageOverlay} {
		opacity: 1;
	}
`;

export const GalleryImage = styled.img`
	object-fit: cover;
	height: 100%;
	width: 100%;
`;

const GeneratePage = () => {
	// const { promptInfo, setPromptInfo } = usePromptContext();
  const [ promptInfo, setPromptInfo ] = useState();

	// call to createPrompt api to save prompt in database
	// const savePrompt = async () => {

  //   // create prompt API request
	// 	const createPromptResponse = await fetch("/api/prompt/createPrompt", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify(promptInfo.prompt),
	// 	});
	// 	const createPromptResponseData = await createPromptResponse.json();

  //   const promptData = {
  //     ...promptInfo,
  //     prompt_id: createPromptResponseData.prompt._id
  //   }
  //   // set prompt context
	// 	setPromptInfo(promptData);

  //   // save prompt data to storage
  //   savePromptDataToStorage(promptData);

  //   // save journey data to storage
  //   await updateStoreJourney({ promptData });

	// };

	// Images array for the gallery
	const images = [
		{ src: "/generate/1.png", alt: "A Basquiat style painting of a skull" },
		{
			src: "/generate/2.png",
			alt: "Create a series of artworks that explore the possibilities and potential consequences of AI in the world of 2035. How might AI challenge or augment traditional artistic practices and forms? How do you see AI shaping the future of the arts and our relationship with it?",
		},
		{
			src: "/generate/3.png",
			alt: "gundam is in japanese sf animation robot. gundam's profile picture. by realistic 3d graphics.",
		},
		{
			src: "/generate/4.png",
			alt: "fullbody armed female figure in a white sci-fi suit, detailed cyber helmet, bald head, lights on cyber mask, a lot of fine details, commercial photography, domina, hyperrealistic poster, hypermaximalist, ornate, luxury, ominous, cgsociety, studio light, 8k, high resolution photography, professional color grading, photorealism, highest quality, highest detail, Cinematic, Long Exposure, 8K, Ultra-HD, Cinematic Lighting, insanely detailed and intricate",
		},
		{
			src: "/generate/5.png",
			alt: "spring landscape, cinematic, 8k, detailed, realistic, octane render, flowers, skies, cream colors, in style watercolors, anime",
		},
		{
			src: "/generate/6.png",
			alt: "a sunlit indoor lounge area with a pool with clear water and another pool with translucent pastel pink water, next to a big window, digital art",
		},
		{
			src: "/generate/7.png",
			alt: "studio photography set of high detail irregular marble stones with gold lines stacked in impossible balance, perfect composition, cinematic light photo studio, beige color scheme, indirect lighting, 8k, elegant and luxury style",
		},
		{
			src: "/generate/8.png",
			alt: "a medium-full-shot, movie poster studio photographic portrait of perfect beautiful Korean women wearing strapless and tiny short pant, outdoors, sunset photo at golden hours, depth of field, Bokeh, shot on Leica Q2, on Flickr",
		},
		{
			src: "/generate/9.png",
			alt: "A beautiful house in tropical modernism style inside of a forest and full of trees and plants",
		},
	];

	return (
		<Wrapper>
			<Gallery>
				{images.map((image, i) => (
					<ImageContainer key={i}>
						<GalleryImage src={image.src} alt={image.alt} />
						<ImageOverlay>
							<OverlayText>{image.alt}</OverlayText>
						</ImageOverlay>
					</ImageContainer>
				))}
			</Gallery>
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
						<GenerateButton onClick={() => newPromptHandler(promptInfo)}>Generate</GenerateButton>
					</Link>
				</Right>
			</StaticContainer>
		</Wrapper>
	);
};

export default GeneratePage;
