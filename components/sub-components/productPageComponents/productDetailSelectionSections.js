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
} from "../../../styles/styledComponents/productPageStyle";

function BodySectionOptions({ header, options, selectedOption, handleClick }) {
	return (
		<BodySection>
			<BodySectionHeader>{header}</BodySectionHeader>
			<BodySectionButtonContainer>
				{options.map((option) => (
					<BodySectionButton
						key={option}
						selected={selectedOption === option}
						onClick={() => handleClick(option)}
					>
						{option}
					</BodySectionButton>
				))}
			</BodySectionButtonContainer>
		</BodySection>
	);
}

export default BodySectionOptions;
