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

function BodySectionButton({ selected, onClick, option }) {
	return (
		<BodySectionButtonContainer selected={selected} onClick={onClick}>
			{option}
		</BodySectionButtonContainer>
	);
}

export default BodySectionButton;
