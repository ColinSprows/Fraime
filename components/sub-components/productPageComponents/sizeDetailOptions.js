import {
	SizeContainer,
	FinishedSize,
	BodySectionHeader,
	BodySectionButtonContainer,
	BodySectionButton,
} from "../../../styles/styledComponents/productPageStyle";

// Props for necessary details, passed as props from product.js
function SizeDetailOptions({ header, options, selectedOption, handleClick, calculate }) {
	return (
		<SizeContainer>
			<BodySectionHeader>{header}</BodySectionHeader>
			<BodySectionButtonContainer>
				{/* Mapping through array */}
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
			<FinishedSize>
				Finished Size: {calculate().height}"x
				{calculate().width}"
			</FinishedSize>
		</SizeContainer>
	);
}

export default SizeDetailOptions;
