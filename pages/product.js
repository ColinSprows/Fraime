import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useImageContext, usePromptContext } from "../context/ContextProvider";
import { set } from "mongoose";

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

export const SizeContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const SizeHeader = styled.h4`
	font-family: Inter;
	margin: 0.5rem 0.75rem;
`;

export const SizeButtonContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
`;

export const SizeButton = styled.button`
	font-family: Inter;
	background: ${(props) => (props.selected ? "black" : "transparent")};
	color: ${(props) => (props.selected ? "white" : "black")};
	border: 1px solid black;
	border-radius: 24px;
	padding: 0.5rem 0rem;
	width: 20%;
	cursor: pointer;
`;

export const SizeFinishedSize = styled.h5`
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
	width: 30vw;
	height: 30vw;
	position: relative;
`;

const ProductPage = () => {
	const [selectedProductTypeTab, setSelectedProductTypeTab] = useState("Print");
	const [selectedPrintSize, setSelectedPrintSize] = useState('12"x12"');
	const [selectedPosterSize, setSelectedPosterSize] = useState('10"x10"');
	const [selectedPostcardSize, setSelectedPostcardSize] = useState('4"x4"');
	const [selectedPaperType, setSelectedPaperType] = useState("Glossy");
	const [selectedFrameOption, setSelectedFrameOption] = useState("Frame");
	const [selectedPrintFrameOption, setSelectedPrintFrameOption] = useState("Frame");
	const [selectedFrameWidth, setSelectedFrameWidth] = useState('1"');
	const [selectedFrameColor, setSelectedFrameColor] = useState("Black");
	const [selectedMatWidth, setSelectedMatWidth] = useState('.5"');
	const [selectedMatColor, setSelectedMatColor] = useState("White");
	const [areFramingOptionsVisible, setAreFramingOptionsVisible] = useState(true);
	const [isMatVisible, setIsMatVisible] = useState(false);
	const [isPrintSizeVisible, setPrintSizeVisible] = useState(true);
	const [isPosterSizeVisible, setPosterSizeVisible] = useState(false);
	const [isPostcardSizeVisible, setPostcardSizeVisible] = useState(false);

	const handleTabClick = (tabName) => {
		setSelectedProductTypeTab(tabName);

		switch (tabName) {
			case "Print":
				setPrintSizeVisible(true);
				setPosterSizeVisible(false);
				setPostcardSizeVisible(false);
				handleFramingOptionsClick(selectedPrintFrameOption);
				break;
			case "Poster":
				setPrintSizeVisible(false);
				setPosterSizeVisible(true);
				setPostcardSizeVisible(false);
				handleFramingOptionsClick("No Frame");
				break;
			case "Postcard":
				setPrintSizeVisible(false);
				setPosterSizeVisible(false);
				setPostcardSizeVisible(true);
				handleFramingOptionsClick("No Frame");
				break;
		}
	};

	const handlePrintSizeClick = (Size) => {
		setSelectedPrintSize(Size);
	};

	const handlePosterSizeClick = (Size) => {
		setSelectedPosterSize(Size);
	};
	const handlePostcardSizeClick = (Size) => {
		setSelectedPostcardSize(Size);
	};

	useEffect(() => {
		if (selectedProductTypeTab === "Print") {
			setSelectedPrintFrameOption(selectedFrameOption);
			console.log(selectedPrintFrameOption);
		}
	}, [selectedFrameOption]);

	const handleFramingOptionsClick = (framingOption) => {
		setSelectedFrameOption(framingOption);

		switch (framingOption) {
			case "Frame":
				setAreFramingOptionsVisible(true);
				setIsMatVisible(false);
				break;
			case "Frame + Mat":
				setAreFramingOptionsVisible(true);
				setIsMatVisible(true);
				break;
			case "No Frame":
				setAreFramingOptionsVisible(false);
				setIsMatVisible(false);
				break;
		}
	};

	const handlePaperTypeClick = (paperType) => {
		setSelectedPaperType(paperType);
	};

	const handleFrameWidthClick = (FrameWidth) => {
		setSelectedFrameWidth(FrameWidth);
	};

	const handleFrameColorClick = (frameColor) => {
		setSelectedFrameColor(frameColor);
	};

	const handleMatWidthClick = (matWidth) => {
		setSelectedMatWidth(matWidth);
	};

	const handleMatColorClick = (matColor) => {
		setSelectedMatColor(matColor);
	};

	const { selectedImage } = useImageContext();
	const { promptInfo } = usePromptContext();

	// useEffect(() => {
	// 	console.log(selectedImage);
	// }, []);

	const calculateFinishedSize = () => {
		let selectedSize = "";
		if (selectedProductTypeTab === "Print") {
			selectedSize = selectedPrintSize;
		} else if (selectedProductTypeTab === "Poster") {
			selectedSize = selectedPosterSize;
		} else if (selectedProductTypeTab === "Postcard") {
			selectedSize = selectedPostcardSize;
		}

		const size = selectedSize.trim().split("x");
		const printWidth = parseInt(size[0].replace(/"/g, ""), 10);
		const printHeight = parseInt(size[1].replace(/"/g, ""), 10);
		let frameWidth = 0;
		let matWidth = 0;
		if (isMatVisible) {
			matWidth = parseFloat(selectedMatWidth.replace(/"/g, ""), 10);
		}

		if (areFramingOptionsVisible) {
			frameWidth = parseFloat(selectedFrameWidth.replace(/"/g, ""), 10);
		}

		const finishedWidth = printWidth + frameWidth * 2 + matWidth * 2;
		const finishedHeight = printHeight + frameWidth * 2 + matWidth * 2;

		return {
			width: finishedWidth,
			height: finishedHeight,
		};
	};

	const createOrder = async () => {
		const framingOptions = areFramingOptionsVisible
			? selectedFrameWidth + ", " + selectedFrameColor
			: "No Frame";

		const matOptions = isMatVisible
			? selectedMatWidth + ", " + selectedMatColor
			: "No Mat";

		let selectedSize = "";
		if (selectedProductTypeTab === "Print") {
			selectedSize = selectedPrintSize;
		} else if (selectedProductTypeTab === "Poster") {
			selectedSize = selectedPosterSize;
		} else if (selectedProductTypeTab === "Postcard") {
			selectedSize = selectedPostcardSize;
		}

		const response = await fetch("/api/order/createOrder", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				prompt_id: promptInfo.prompt_id,
				image_id: selectedImage.image_id,
				product_type: selectedProductTypeTab,
				product_size: selectedSize,
				paper_type: selectedPaperType,
				framing_type: selectedFrameOption,
				framing_options: framingOptions,
				mat_options: matOptions,
			}),
		});
		const data = await response.json();
		console.log(data);
	};

	return (
		<Wrapper>
			<Left>
				<ImageContainer>
					{selectedImage && (
						<Image src={selectedImage.url} alt="Selected product image" fill />
					)}
				</ImageContainer>
			</Left>
			<Right>
				<BuyCard>
					<TopTabsContainer>
						<TabButtons
							selected={selectedProductTypeTab === "Print"}
							onClick={() => handleTabClick("Print")}
						>
							Print
						</TabButtons>
						<TabButtons
							selected={selectedProductTypeTab === "Poster"}
							onClick={() => handleTabClick("Poster")}
						>
							Poster
						</TabButtons>
						<TabButtons
							selected={selectedProductTypeTab === "Postcard"}
							onClick={() => handleTabClick("Postcard")}
						>
							Postcard
						</TabButtons>
					</TopTabsContainer>
					<BodyContainer>
						{isPrintSizeVisible && (
							<SizeContainer>
								<SizeHeader>Print Size:</SizeHeader>
								<SizeButtonContainer>
									<SizeButton
										selected={selectedPrintSize === '12"x12"'}
										onClick={() => handlePrintSizeClick('12"x12"')}
									>
										12"x12"
									</SizeButton>
									<SizeButton
										selected={selectedPrintSize === '14"x14"'}
										onClick={() => handlePrintSizeClick('14"x14"')}
									>
										14"x14"
									</SizeButton>
									<SizeButton
										selected={selectedPrintSize === '16"x16"'}
										onClick={() => handlePrintSizeClick('16"x16"')}
									>
										16"x16"
									</SizeButton>
									<SizeButton
										selected={selectedPrintSize === '18"x18"'}
										onClick={() => handlePrintSizeClick('18"x18"')}
									>
										18"x18"
									</SizeButton>
								</SizeButtonContainer>
								<SizeFinishedSize>
									Finished Size: {calculateFinishedSize().height}"x
									{calculateFinishedSize().width}"
								</SizeFinishedSize>
							</SizeContainer>
						)}
						{isPosterSizeVisible && (
							<SizeContainer>
								<SizeHeader>Poster Size:</SizeHeader>
								<SizeButtonContainer>
									<SizeButton
										selected={selectedPosterSize === '10"x10"'}
										onClick={() => handlePosterSizeClick('10"x10"')}
									>
										10"x10"
									</SizeButton>
									<SizeButton
										selected={selectedPosterSize === '12"x12"'}
										onClick={() => handlePosterSizeClick('12"x12"')}
									>
										12"x12"
									</SizeButton>
									<SizeButton
										selected={selectedPosterSize === '14"x14"'}
										onClick={() => handlePosterSizeClick('14"x14"')}
									>
										14"x14"
									</SizeButton>
									<SizeButton
										selected={selectedPosterSize === '16"x16"'}
										onClick={() => handlePosterSizeClick('16"x16"')}
									>
										16"x16"
									</SizeButton>
								</SizeButtonContainer>
								<SizeFinishedSize>
									Finished Size: {calculateFinishedSize().height}"x
									{calculateFinishedSize().width}"
								</SizeFinishedSize>
							</SizeContainer>
						)}
						{isPostcardSizeVisible && (
							<SizeContainer>
								<SizeHeader>Postcard Size:</SizeHeader>
								<SizeButtonContainer>
									<SizeButton
										selected={selectedPostcardSize === '4"x4"'}
										onClick={() => handlePostcardSizeClick('4"x4"')}
									>
										4"x4"
									</SizeButton>
									<SizeButton
										selected={selectedPostcardSize === '5"x5"'}
										onClick={() => handlePostcardSizeClick('5"x5"')}
									>
										5"x5"
									</SizeButton>
									<SizeButton
										selected={selectedPostcardSize === '6"x6"'}
										onClick={() => handlePostcardSizeClick('6"x6"')}
									>
										6"x6"
									</SizeButton>
									<SizeButton
										selected={selectedPostcardSize === '8"x8"'}
										onClick={() => handlePostcardSizeClick('8"x8"')}
									>
										8"x8"
									</SizeButton>
								</SizeButtonContainer>
								<SizeFinishedSize>
									Finished Size: {calculateFinishedSize().height}"x
									{calculateFinishedSize().width}"
								</SizeFinishedSize>
							</SizeContainer>
						)}
						<FramingOptionsContainer>
							{selectedProductTypeTab === "Print" && (
								<>
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
								</>
							)}
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
						{areFramingOptionsVisible && (
							<BodySection>
								<BodySectionHeader>Frame Width:</BodySectionHeader>
								<BodySectionButtonContainer>
									<BodySectionButton
										selected={selectedFrameWidth === '1"'}
										onClick={() => handleFrameWidthClick('1"')}
									>
										1"
									</BodySectionButton>
									<BodySectionButton
										selected={selectedFrameWidth === '2"'}
										onClick={() => handleFrameWidthClick('2"')}
									>
										2"
									</BodySectionButton>
									<BodySectionButton
										selected={selectedFrameWidth === '3"'}
										onClick={() => handleFrameWidthClick('3"')}
									>
										3"
									</BodySectionButton>
									<BodySectionButton
										selected={selectedFrameWidth === '4"'}
										onClick={() => handleFrameWidthClick('4"')}
									>
										4"
									</BodySectionButton>
								</BodySectionButtonContainer>
							</BodySection>
						)}
						{areFramingOptionsVisible && (
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
						)}
						{isMatVisible && (
							<BodySection>
								<BodySectionHeader>Mat Width:</BodySectionHeader>
								<BodySectionButtonContainer>
									<BodySectionButton
										selected={selectedMatWidth === '.5"'}
										onClick={() => handleMatWidthClick('.5"')}
									>
										.5"
									</BodySectionButton>
									<BodySectionButton
										selected={selectedMatWidth === '1"'}
										onClick={() => handleMatWidthClick('1"')}
									>
										1"
									</BodySectionButton>
									<BodySectionButton
										selected={selectedMatWidth === '1.5"'}
										onClick={() => handleMatWidthClick('1.5"')}
									>
										1.5"
									</BodySectionButton>
									<BodySectionButton
										selected={selectedMatWidth === '2"'}
										onClick={() => handleMatWidthClick('2"')}
									>
										2"
									</BodySectionButton>
								</BodySectionButtonContainer>
							</BodySection>
						)}
						{isMatVisible && (
							<BodySection>
								<BodySectionHeader>Mat Width:</BodySectionHeader>
								<BodySectionButtonContainer>
									<BodySectionButton
										selected={selectedMatColor === "White"}
										onClick={() => handleMatColorClick("White")}
									>
										White
									</BodySectionButton>
									<BodySectionButton
										selected={selectedMatColor === "Black"}
										onClick={() => handleMatColorClick("Black")}
									>
										Black
									</BodySectionButton>
									<BodySectionButton
										selected={selectedMatColor === "Cream"}
										onClick={() => handleMatColorClick("Cream")}
									>
										Cream
									</BodySectionButton>
									<BodySectionButton
										selected={selectedMatColor === "Tan"}
										onClick={() => handleMatColorClick("Tan")}
									>
										Black
									</BodySectionButton>
								</BodySectionButtonContainer>
							</BodySection>
						)}
					</BodyContainer>
					<BottomContainer>
						<BottomText>Add the prompt to the back of the print</BottomText>
					</BottomContainer>
				</BuyCard>
				<BuyNowButton onClick={() => createOrder()}>
					<span>Buy Now</span>
				</BuyNowButton>
			</Right>
		</Wrapper>
	);
};

export default ProductPage;
