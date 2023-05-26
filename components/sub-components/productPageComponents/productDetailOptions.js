import {
	BodySection,
	BodySectionHeader,
	BodySectionButtonContainer,
	BodySectionButton,
} from "../../../styles/styledComponents/productPageStyle";

// Props for necessary details, passed as props from product.js
function ProductDetailOptions({ header, options, selectedOption, handleClick }) {
	return (
		<BodySection>
			<BodySectionHeader>{header}</BodySectionHeader>
			<BodySectionButtonContainer>
				{/* Mapping through arrays */}
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

export default ProductDetailOptions;
