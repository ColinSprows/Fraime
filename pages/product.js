import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
	useImageContext,
	usePromptContext,
	useJourneyContext,
} from "../context/ContextProvider";
import {
	Wrapper,
	Left,
	Right,
	BuyCard,
	TopTabsContainer,
	TabButtons,
	FramingOptionsTabContainer,
	FramingOptionsTab,
	BodyContainer,
	BottomContainer,
	BottomText,
	BuyNowButton,
	ImageContainer,
} from "../styles/styledComponents/productPageStyle";
import ProductDetailOptions from "@/components/sub-components/productPageComponents/productDetailOptions";
import SizeDetailOptions from "@/components/sub-components/productPageComponents/sizeDetailOptions";

import { newOrderHandler } from '@/utils/newOrderHandler';
import { loadStorePrompt, loadStoreJourney, loadStoreImage } from '@/utils/storageHandler';

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
	const [selectedMatColor, setSelectedMatColor] = useState("Black");

	// Visibility states
	const [framingDetailOptionsVisible, setFramingDetailOptionsVisible] = useState(true);
	const [matDetailOptionsVisible, setMatDetailOptionsVisible] = useState(false);
	const [isPrintSizeVisible, setPrintSizeVisible] = useState(true);
	const [isPosterSizeVisible, setPosterSizeVisible] = useState(false);
	const [isPostcardSizeVisible, setPostcardSizeVisible] = useState(false);

	// Image and Prompt context brought forward through user journey
	// const { selectedImage } = useImageContext();
	// const { promptInfo } = usePromptContext();
	// const { journey } = useJourneyContext();
  const [hasMounted, setHasMounted] = useState(false);
  const [ promptInfo, setPromptInfo ] = useState();
  const [ journey, setJourney ] = useState();
  const [ selectedImage, setSelectedImage ] = useState();

  useEffect(() => {
		// Prevents hydration issues
		setHasMounted(true);
	}, []);

  useEffect(() => {
    setPromptInfo(loadStorePrompt());
    setJourney(loadStoreJourney());
    setSelectedImage(loadStoreImage());
	}, [hasMounted]);

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

	// useEffect on selectedImage and journey to check if the image context is being passed through correctly
	// useEffect(() => {
	// 	console.log(selectedImage);
	// 	console.log(journey);
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
	const createOrderAndUpdateJourney = async () => {
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

		const data = await newOrderHandler(
      {
        prompt_id: promptInfo.prompt_id,
        image_id: selectedImage.image_id,
        product_type: selectedProductTypeTab,
        product_size: selectedSize,
        paper_type: selectedPaperType,
        framing_type: selectedFrameOption,
        framing_options: framingOptions,
        mat_options: matOptions,
      },
      {
				journey_id: journey._id,
				ordered_image_id: selectedImage.image_id,
			}
    );

		return data.order._id;
	};

	// Props to be passed to each Body Section component
	const printSizeOptions = ['12"x12"', '14"x14"', '16"x16"', '18"x18"'];
	const posterSizeOptions = ['10"x10"', '12"x12"', '14"x14"', '16"x16"'];
	const postcardSizeOptions = ['4"x4"', '5"x5"', '6"x6"', '8"x8"'];

	const paperTypeOptions = ["Glossy", "Matte", "Textured", "Semi-Gloss"];
	const frameWidthOptions = ['1"', '2"', '3"', '4"'];
	const frameColorOptions = ["Black", "White", "Natural", "Walnut"];
	const matWidthOptions = ['.5"', '1"', '1.5"', '2"'];
	const matColorOptions = ["Black", "White", "Cream", "Tan"];

	const router = useRouter();

	return (
		<Wrapper>
			<Left>
				<ImageContainer>
					{/* Using Image Context to display image selected on Discovery page */}
					{hasMounted && <Image src={selectedImage?.url} alt="Selected product image" fill />}
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
							<SizeDetailOptions
								header="Print Size:"
								options={printSizeOptions}
								selectedOption={selectedPrintSize}
								handleClick={handlePrintSizeClick}
								calculate={calculateFinishedSize}
							/>
						)}
						{/* Poster sizes */}
						{isPosterSizeVisible && (
							<SizeDetailOptions
								header="Poster Size:"
								options={posterSizeOptions}
								selectedOption={selectedPosterSize}
								handleClick={handlePosterSizeClick}
								calculate={calculateFinishedSize}
							/>
						)}
						{/* Postcard sizes */}
						{isPostcardSizeVisible && (
							<SizeDetailOptions
								header="Postcard Size:"
								options={postcardSizeOptions}
								selectedOption={selectedPostcardSize}
								handleClick={handlePostcardSizeClick}
								calculate={calculateFinishedSize}
							/>
						)}
						<FramingOptionsTabContainer>
							{/* Conditional logic to show framing options depending on selected product type. These two only for prints */}
							{selectedProductTypeTab === "Print" && (
								<>
									<FramingOptionsTab
										selected={selectedFrameOption === "Frame"}
										onClick={() => handleFramingOptionsClick("Frame")}
									>
										Frame
									</FramingOptionsTab>
									<FramingOptionsTab
										selected={selectedFrameOption === "Frame + Mat"}
										onClick={() => handleFramingOptionsClick("Frame + Mat")}
									>
										Frame + Mat
									</FramingOptionsTab>
								</>
							)}
							{/* Available for all product types */}
							<FramingOptionsTab
								selected={selectedFrameOption === "No Frame"}
								onClick={() => handleFramingOptionsClick("No Frame")}
							>
								No Frame
							</FramingOptionsTab>
						</FramingOptionsTabContainer>
						{/* Main body for product selections, depending on which framing option is selected */}
						{/* Available for all framing options and product types */}
						<ProductDetailOptions
							header="Paper Type:"
							options={paperTypeOptions}
							selectedOption={selectedPaperType}
							handleClick={handlePaperTypeClick}
						/>
						{/* This state is set on click of framing option tab so that the the frame detail options only display when the appropriate framing option is selected*/}
						{framingDetailOptionsVisible && (
							<ProductDetailOptions
								header="Frame Width:"
								options={frameWidthOptions}
								selectedOption={selectedFrameWidth}
								handleClick={handleFrameWidthClick}
							/>
						)}
						{/* Same as above */}
						{framingDetailOptionsVisible && (
							<ProductDetailOptions
								header="Frame Color:"
								options={frameColorOptions}
								selectedOption={selectedFrameColor}
								handleClick={handleFrameColorClick}
							/>
						)}
						{/* Same as above, but for mat details depending on if Frame + Mat is selected as the framing option */}
						{matDetailOptionsVisible && (
							<ProductDetailOptions
								header="Mat Width:"
								options={matWidthOptions}
								selectedOption={selectedMatWidth}
								handleClick={handleMatWidthClick}
							/>
						)}
						{/* Same as above */}
						{matDetailOptionsVisible && (
							<ProductDetailOptions
								header="Mat Color:"
								options={matColorOptions}
								selectedOption={selectedMatColor}
								handleClick={handleMatColorClick}
							/>
						)}
					</BodyContainer>
					{/* Are we doing this? */}
					<BottomContainer>
						<BottomText>Add the prompt to the back of the print</BottomText>
					</BottomContainer>
				</BuyCard>
				{/* Button that makes the Fetch request (will eventually also redirect to checkout page) */}
				<BuyNowButton
					onClick={async () => {
						const orderId = await createOrderAndUpdateJourney();
						console.log(orderId);
						router.push(`/purchase/${orderId}`);
					}}
				>
					<span>Buy Now</span>
				</BuyNowButton>
			</Right>
		</Wrapper>
	);
};

export default ProductPage;
