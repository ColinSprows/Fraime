import styled from "styled-components";

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

export const FinishedSize = styled.h5`
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
