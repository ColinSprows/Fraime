import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";
import { useImageContext } from "../context/ContextProvider";

export const Wrapper = styled.div`
	height: calc(100vh - 4rem);
	display: flex;

	@media (max-height: 696px) {
		align-items: flex-start;
	}

	@media (max-width: 768px) {
		align-items: flex-start;
		flex-direction: column;
	}
`;

export const Left = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 50%;

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
	flex-direction: column;
	width: 50%;
	padding: 2rem 2rem 2rem 0rem;

	@media (max-width: 768px) {
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 2rem 2rem 2rem 2rem;
	}
`;

export const BuyCard = styled.div`
	width: 100%;
	height: 100%;
	border: 1px solid black;
	border-radius: 25px;
`;

export const TopTabsContainer = styled.div`
	width: 100%;
	height: 2.5rem;
	border-bottom: 1px solid black;
	display: flex;
	justify-content: space-around;
`;

export const TabButtons = styled.button`
	width: 100%;
	height: 100%;
	background: ${(props) => (props.selected ? "black" : "transparent")};
	color: ${(props) => (props.selected ? "white" : "black")};
	border: none;
	cursor: pointer;
	border-left: 1px solid black;

	&:first-child {
		border-top-left-radius: 24px;
		border-left: none;
	}

	&:last-child {
		border-top-right-radius: 24px;
	}
`;

export const PrintSizeContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const PrintSizeHeader = styled.h4`
	font-family: Inter;
	margin: 0.5rem 0.75rem;
`;

export const PrintSizeButtonContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
`;

export const PrintSizeButton = styled.button`
	font-family: Inter;
	background: ${(props) => (props.selected ? "black" : "transparent")};
	color: ${(props) => (props.selected ? "white" : "black")};
	border: 1px solid black;
	border-radius: 24px;
	padding: 0.5rem 0rem;
	width: 20%;
	cursor: pointer;
`;

export const PrintSizeFinishedSize = styled.h5`
	font-family: Inter;
	font-size: 0.75rem;
	margin: 0.5rem 0.75rem;
`;

export const FramingOptionsContainer = styled.div`
	width: 100%;
	height: 3rem;
	border-top: 1px solid black;
	border-bottom: 1px solid black;
	display: flex;
	justify-content: space-around;
`;

export const FramingOptionsButton = styled.button`
	width: 100%;
	height: 2.9rem;
	background: ${(props) => (props.selected ? "black" : "transparent")};
	color: ${(props) => (props.selected ? "white" : "black")};
	border: none;
	cursor: pointer;
	border-left: 1px solid black;

	&:first-child {
		border-left: none;
	}
`;

export const BodyContainer = styled.div`
	width: 100%;
	height: calc(100% - 5rem);
	display: flex;
	flex-direction: column;
	overflow-y: auto;
`;

export const BodySection = styled.div`
	:last-child {
		@media (max-width: 768px) {
			margin-bottom: 2rem;
		}
	}
`;

export const BodySectionHeader = styled.h4`
	font-family: Inter;
	margin: 0.5rem 0.75rem;
`;

export const BodySectionButtonContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
`;

export const BodySectionButton = styled.button`
	font-family: Inter;
	background: ${(props) => (props.selected ? "black" : "transparent")};
	color: ${(props) => (props.selected ? "white" : "black")};
	border: 1px solid black;
	border-radius: 24px;
	padding: 0.5rem 0rem;
	width: 20%;
	cursor: pointer;
`;

export const BottomContainer = styled.div`
	width: 100%;
	height: 2.5rem;
	border-top: 1px solid black;
	display: flex;
	justify-content: space-around;
	align-items: center;

	@media (max-height: 696px) {
		margin-top: 2rem;
	}
`;

export const BottomText = styled.h5`
	font-family: Inter;
`;

export const BuyNowButton = styled.button`
	background-color: ${(props) => props.theme.colors.button};
	color: black;
	padding: 1rem 0rem;
	width: 100%;
	border: 1px solid black;
	border-radius: 50px;
	font-family: InterBlack;
	font-size: clamp(1.25rem, 2vw, 2rem);
	letter-spacing: -0.05em;
	white-space: nowrap;
	cursor: pointer;
	margin-top: 2rem;
	transition: 0.2s;
	will-change: transform;

	&:hover {
		letter-spacing: 0em;
	}

	&:hover span {
		color: white;
		text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
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

export const ImageContainer = styled.div`
	width: 35vw;
	height: 35vw;
	position: relative;
`;

const ProductPage = () => {
	const [selectedTab, setSelectedTab] = useState("Print");
	const [selectedPrintSize, setSelectedPrintSize] = useState('12"x12"');
	const [selectedFrameOption, setSelectedFrameOption] = useState("Frame");
	const [selectedPaperType, setSelectedPaperType] = useState("Glossy");
	const [selectedFrameType, setSelectedFrameType] = useState('1"');
	const [selectedFrameColor, setSelectedFrameColor] = useState("Black");

	const handleTabClick = (tabName) => {
		setSelectedTab(tabName);
	};

	const handlePrintSizeClick = (printSize) => {
		setSelectedPrintSize(printSize);
	};

	const handleFramingOptionsClick = (framingOption) => {
		setSelectedFrameOption(framingOption);
	};

	const handlePaperTypeClick = (paperType) => {
		setSelectedPaperType(paperType);
	};

	const handleFrameTypeClick = (frameType) => {
		setSelectedFrameType(frameType);
	};

	const handleFrameColorClick = (frameColor) => {
		setSelectedFrameColor(frameColor);
	};

	const { selectedImage } = useImageContext();

	return (
		<Wrapper>
			<Left>
				<ImageContainer>
					{selectedImage && (
						<Image src={selectedImage} alt="Selected product image" fill />
					)}
				</ImageContainer>
			</Left>
			<Right>
				<BuyCard>
					<TopTabsContainer>
						<TabButtons
							selected={selectedTab === "Print"}
							onClick={() => handleTabClick("Print")}
						>
							Print
						</TabButtons>
						<TabButtons
							selected={selectedTab === "Poster"}
							onClick={() => handleTabClick("Poster")}
						>
							Poster
						</TabButtons>
						<TabButtons
							selected={selectedTab === "Postcard"}
							onClick={() => handleTabClick("Postcard")}
						>
							Postcard
						</TabButtons>
					</TopTabsContainer>
					<BodyContainer>
						<PrintSizeContainer>
							<PrintSizeHeader>Print Size:</PrintSizeHeader>
							<PrintSizeButtonContainer>
								<PrintSizeButton
									selected={selectedPrintSize === '12"x12"'}
									onClick={() => handlePrintSizeClick('12"x12"')}
								>
									12"x12"
								</PrintSizeButton>
								<PrintSizeButton
									selected={selectedPrintSize === '14"x14"'}
									onClick={() => handlePrintSizeClick('14"x14"')}
								>
									14"x14"
								</PrintSizeButton>
								<PrintSizeButton
									selected={selectedPrintSize === '16"x16"'}
									onClick={() => handlePrintSizeClick('16"x16"')}
								>
									16"x16"
								</PrintSizeButton>
								<PrintSizeButton
									selected={selectedPrintSize === '18"x18"'}
									onClick={() => handlePrintSizeClick('18"x18"')}
								>
									18"x18"
								</PrintSizeButton>
							</PrintSizeButtonContainer>
							<PrintSizeFinishedSize>Finished Size: 16"x12"</PrintSizeFinishedSize>
						</PrintSizeContainer>
						<FramingOptionsContainer>
							<FramingOptionsButton
								selected={selectedFrameOption === "Frame"}
								onClick={() => handleFramingOptionsClick("Frame")}
							>
								Frame
							</FramingOptionsButton>
							<FramingOptionsButton
								selected={selectedFrameOption === "Frame + Mat"}
								onClick={() => handleFramingOptionsClick("Frame + Mat")}
							>
								Frame + Mat
							</FramingOptionsButton>
							<FramingOptionsButton
								selected={selectedFrameOption === "No Frame"}
								onClick={() => handleFramingOptionsClick("No Frame")}
							>
								No Frame
							</FramingOptionsButton>
						</FramingOptionsContainer>
						<BodySection>
							<BodySectionHeader>Paper Type:</BodySectionHeader>
							<BodySectionButtonContainer>
								<BodySectionButton
									selected={selectedPaperType === "Glossy"}
									onClick={() => handlePaperTypeClick("Glossy")}
								>
									Glossy
								</BodySectionButton>
								<BodySectionButton
									selected={selectedPaperType === "Matte"}
									onClick={() => handlePaperTypeClick("Matte")}
								>
									Matte
								</BodySectionButton>
								<BodySectionButton
									selected={selectedPaperType === "Textured"}
									onClick={() => handlePaperTypeClick("Textured")}
								>
									Textured
								</BodySectionButton>
								<BodySectionButton
									selected={selectedPaperType === "Semi-Gloss"}
									onClick={() => handlePaperTypeClick("Semi-Gloss")}
								>
									Semi-Gloss
								</BodySectionButton>
							</BodySectionButtonContainer>
						</BodySection>
						<BodySection>
							<BodySectionHeader>Frame Type:</BodySectionHeader>
							<BodySectionButtonContainer>
								<BodySectionButton
									selected={selectedFrameType === '1"'}
									onClick={() => handleFrameTypeClick('1"')}
								>
									1"
								</BodySectionButton>
								<BodySectionButton
									selected={selectedFrameType === '2"'}
									onClick={() => handleFrameTypeClick('2"')}
								>
									2"
								</BodySectionButton>
								<BodySectionButton
									selected={selectedFrameType === '3"'}
									onClick={() => handleFrameTypeClick('3"')}
								>
									3"
								</BodySectionButton>
								<BodySectionButton
									selected={selectedFrameType === '4"'}
									onClick={() => handleFrameTypeClick('4"')}
								>
									4"
								</BodySectionButton>
							</BodySectionButtonContainer>
						</BodySection>
						<BodySection>
							<BodySectionHeader>Frame Color:</BodySectionHeader>
							<BodySectionButtonContainer>
								<BodySectionButton
									selected={selectedFrameColor === "Black"}
									onClick={() => handleFrameColorClick("Black")}
								>
									Black
								</BodySectionButton>
								<BodySectionButton
									selected={selectedFrameColor === "White"}
									onClick={() => handleFrameColorClick("White")}
								>
									White
								</BodySectionButton>
								<BodySectionButton
									selected={selectedFrameColor === "Natural"}
									onClick={() => handleFrameColorClick("Natural")}
								>
									Natural
								</BodySectionButton>
								<BodySectionButton
									selected={selectedFrameColor === "Walnut"}
									onClick={() => handleFrameColorClick("Walnut")}
								>
									Walnut
								</BodySectionButton>
							</BodySectionButtonContainer>
						</BodySection>
					</BodyContainer>
					<BottomContainer>
						<BottomText>Add the prompt to the back of the print</BottomText>
					</BottomContainer>
				</BuyCard>
				<BuyNowButton>
					<span>Buy Now</span>
				</BuyNowButton>
			</Right>
		</Wrapper>
	);
};

export default ProductPage;
