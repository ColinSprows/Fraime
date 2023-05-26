import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useImageContext, usePromptContext } from "../context/ContextProvider";
import {
	Wrapper,
	Left,
	Right,
	BuyCard,
	TopTabsContainer,
	TabButtons,
	SizeContainer,
	SizeHeader,
	SizeButtonContainer,
	SizeButton,
	FinishedSize,
	FramingOptionsContainer,
	FramingOptionsButton,
	BodyContainer,
	BodySection,
	BodySectionHeader,
	BodySectionButtonContainer,
	BodySectionButton,
	BottomContainer,
	BottomText,
	BuyNowButton,
	ImageContainer,
} from "../styles/styledComponents/productPageStyle";

const ProductPage = () => {
	// Tab states
	const [selectedProductTypeTab, setSelectedProductTypeTab] = useState("Print");
	const [selectedFrameOption, setSelectedFrameOption] = useState("Frame");
	const [selectedPrintFrameOption, setSelectedPrintFrameOption] = useState("Frame");

	// Size states for different product types
	const [selectedPrintSize, setSelectedPrintSize] = useState('12"x12"');
	const [selectedPosterSize, setSelectedPosterSize] = useState('10"x10"');
	const [selectedPostcardSize, setSelectedPostcardSize] = useState('4"x4"');

	// Product selections
	const [selectedPaperType, setSelectedPaperType] = useState("Glossy");
	const [selectedFrameWidth, setSelectedFrameWidth] = useState('1"');
	const [selectedFrameColor, setSelectedFrameColor] = useState("Black");
	const [selectedMatWidth, setSelectedMatWidth] = useState('.5"');
	const [selectedMatColor, setSelectedMatColor] = useState("White");

	// Visibility states
	const [framingDetailOptionsVisible, setFramingDetailOptionsVisible] = useState(true);
	const [matDetailOptionsVisible, setMatDetailOptionsVisible] = useState(false);
	const [isPrintSizeVisible, setPrintSizeVisible] = useState(true);
	const [isPosterSizeVisible, setPosterSizeVisible] = useState(false);
	const [isPostcardSizeVisible, setPostcardSizeVisible] = useState(false);

	// Image and Prompt context brought forward through user journey
	const { selectedImage } = useImageContext();
	const { promptInfo } = usePromptContext();

	// Click handler for product type tabs that assigns visibility states for size options and framing options
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

	// Click handlers for size options, depending on product type
	const handlePrintSizeClick = (Size) => {
		setSelectedPrintSize(Size);
	};
	const handlePosterSizeClick = (Size) => {
		setSelectedPosterSize(Size);
	};
	const handlePostcardSizeClick = (Size) => {
		setSelectedPostcardSize(Size);
	};

	// Click handler for framing options that assigns visibility states for framing details and mat details depending on the framing option selected
	const handleFramingOptionsClick = (framingOption) => {
		setSelectedFrameOption(framingOption);

		switch (framingOption) {
			case "Frame":
				setFramingDetailOptionsVisible(true);
				setMatDetailOptionsVisible(false);
				break;
			case "Frame + Mat":
				setFramingDetailOptionsVisible(true);
				setMatDetailOptionsVisible(true);
				break;
			case "No Frame":
				setFramingDetailOptionsVisible(false);
				setMatDetailOptionsVisible(false);
				break;
		}
	};

	// As Print has more framing options than the other two product types, a particular state storing Prints framing options selection is needed
	// This use effect updates the selected framing option for Print when a Framing Option is clicked and the selected tab is Print
	// This way, if the User selects Print again, their previous framing option selected will be displayed
	useEffect(() => {
		if (selectedProductTypeTab === "Print") {
			setSelectedPrintFrameOption(selectedFrameOption);
		}
	}, [selectedFrameOption]);

	// Click handlers for product detail selections
	// Paper types
	const handlePaperTypeClick = (paperType) => {
		setSelectedPaperType(paperType);
	};

	// Frame Details
	const handleFrameWidthClick = (FrameWidth) => {
		setSelectedFrameWidth(FrameWidth);
	};
	const handleFrameColorClick = (frameColor) => {
		setSelectedFrameColor(frameColor);
	};

	// Mat Details
	const handleMatWidthClick = (matWidth) => {
		setSelectedMatWidth(matWidth);
	};
	const handleMatColorClick = (matColor) => {
		setSelectedMatColor(matColor);
	};

	// useEffect on selectedImage to check if the image context is being passed through correctly
	// useEffect(() => {
	// 	console.log(selectedImage);
	// }, []);

	// Function to calculate the finished size of the product depending on size selected, frame width selected, and mat width selected
	const calculateFinishedSize = () => {
		let selectedSize = "";
		if (selectedProductTypeTab === "Print") {
			selectedSize = selectedPrintSize;
		} else if (selectedProductTypeTab === "Poster") {
			selectedSize = selectedPosterSize;
		} else if (selectedProductTypeTab === "Postcard") {
			selectedSize = selectedPostcardSize;
		}

		// Splits selected size into two (width and height), necessary if non-square prints are eventually offered
		const size = selectedSize.trim().split("x");
		const printWidth = parseInt(size[0].replace(/"/g, ""), 10);
		const printHeight = parseInt(size[1].replace(/"/g, ""), 10);
		let frameWidth = 0;
		let matWidth = 0;
		// Conditional logic to use frame and mat widths only if they are visible
		if (framingDetailOptionsVisible) {
			frameWidth = parseFloat(selectedFrameWidth.replace(/"/g, ""), 10);
		}
		if (matDetailOptionsVisible) {
			matWidth = parseFloat(selectedMatWidth.replace(/"/g, ""), 10);
		}

		// Returning final calculations
		return {
			width: printWidth + frameWidth * 2 + matWidth * 2,
			height: printHeight + frameWidth * 2 + matWidth * 2,
		};
	};

	// Fetch request to create Order document in database to be used with Stripe
	const createOrder = async () => {
		// Conditional logic to determine if framing and mat details are sent in the body of the request
		const framingOptions = framingDetailOptionsVisible
			? selectedFrameWidth + ", " + selectedFrameColor
			: "No Frame";

		const matOptions = matDetailOptionsVisible
			? selectedMatWidth + ", " + selectedMatColor
			: "No Mat";

		// Conditional logic to determine which size state is sent in the body of the request
		let selectedSize = "";
		if (selectedProductTypeTab === "Print") {
			selectedSize = selectedPrintSize;
		} else if (selectedProductTypeTab === "Poster") {
			selectedSize = selectedPosterSize;
		} else if (selectedProductTypeTab === "Postcard") {
			selectedSize = selectedPostcardSize;
		}

		// The actual fetch request utilizing prompt and image context and all selected options via states and conditional logic above
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
		// console.log(data);
	};

	// Props to be passed to each Body Section component

	return (
		<Wrapper>
			<Left>
				<ImageContainer>
					{/* Using Image Context to display image selected on Discovery page */}
					<Image src={selectedImage.url} alt="Selected product image" fill />
				</ImageContainer>
			</Left>
			<Right>
				<BuyCard>
					{/* Tabs for product type with relevant click handler and state requirements */}
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
						{/* Conditional logic to display relevant size options depending on product type selected */}
						{/* Print sizes */}
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
								<FinishedSize>
									Finished Size: {calculateFinishedSize().height}"x
									{calculateFinishedSize().width}"
								</FinishedSize>
							</SizeContainer>
						)}
						{/* Poster sizes */}
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
								<FinishedSize>
									Finished Size: {calculateFinishedSize().height}"x
									{calculateFinishedSize().width}"
								</FinishedSize>
							</SizeContainer>
						)}
						{/* Postcard sizes */}
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
								<FinishedSize>
									Finished Size: {calculateFinishedSize().height}"x
									{calculateFinishedSize().width}"
								</FinishedSize>
							</SizeContainer>
						)}
						<FramingOptionsContainer>
							{/* Conditional logic to show framing options depending on selected product type. These two only for prints */}
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
							{/* Available for all product types */}
							<FramingOptionsButton
								selected={selectedFrameOption === "No Frame"}
								onClick={() => handleFramingOptionsClick("No Frame")}
							>
								No Frame
							</FramingOptionsButton>
						</FramingOptionsContainer>
						{/* Main body for product selections, depending on which framing option is selected */}
						<BodySection>
							{/* Available for all framing options and product types */}
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
						{/* This state is set on click of framing option tab so that the the frame detail options only display when the appropriate framing option is selected*/}
						{framingDetailOptionsVisible && (
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
						{/* Same as above */}
						{framingDetailOptionsVisible && (
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
						{/* Same as above, but for mat details depending on if Frame + Mat is selected as the framing option */}
						{matDetailOptionsVisible && (
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
						{/* Same as above */}
						{matDetailOptionsVisible && (
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
					{/* Are we doing this? */}
					<BottomContainer>
						<BottomText>Add the prompt to the back of the print</BottomText>
					</BottomContainer>
				</BuyCard>
				{/* Button that makes the Fetch request (will eventually also redirect to checkout page) */}
				<BuyNowButton onClick={() => createOrder()}>
					<span>Buy Now</span>
				</BuyNowButton>
			</Right>
		</Wrapper>
	);
};

export default ProductPage;
