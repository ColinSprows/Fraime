import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { useContext } from "react";
import ContextProvider from "@/context/ContextProvider";

export const Wrapper = styled.div`
	height: calc(100vh - 4rem);
	display: flex;
`;

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	padding: 0rem 4rem;

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
	max-width: 800px;

	@media (max-width: 768px) {
		width: 100vw;
		padding: 0rem 2rem;
		align-items: center;
	}
`;

export const Right = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: calc(40vw-8rem);
	max-width: 600px;

	@media (max-width: 768px) {
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

export const TextContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: 2rem;
`;

export const PromptPrint = styled.h4`
	background-color: ${(props) => props.bg || "transparent"};
	color: ${(props) => props.color || props.theme.colors.background};
	padding: ${(props) => props.pad || "5px 0px"};
	border-radius: 50px;
	font-family: InterExtraBold;
	font-size: clamp(0.5rem, 4vw, 1.5rem);
	font-weight: 100;

	@media (max-width: 768px) {
		padding: ${(props) => props.pad || "5px 5px"};
	}
`;

export const Main = styled.h3`
	font-family: InterLight;
	font-size: clamp(2.5rem, 7vw, 5rem);
	white-space: nowrap;
	font-weight: 100;
	line-height: 0.9;
`;

export const MainSerif = styled.h3`
	font-family: DMSerifDisplayItalic;
	font-size: clamp(2.5rem, 7.25vw, 5.25rem);
	line-height: 0.85;
	font-weight: 100;
	text-align: center;
`;

export const Sub = styled.h5`
	font-family: InterExtraLight;
	font-size: clamp(0.5rem, 3vw, 1rem);

	@media (max-width: 768px) {
		display: none;
	}
`;

export const SubMobile = styled.h5`
	font-family: InterExtraLight;
	font-size: clamp(0.5rem, 3vw, 1rem);
`;

export const Bottom = styled.div`
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	justify-content: center;
	width: 100vw;
	max-width: 800px;
	align-items: center;

	@media (min-width: 768px) {
		display: none;
	}
`;

export const StartCreatingButton = styled.button`
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
		transform: translate(-1%, -1%) scale(1.01);
		background: ${(props) => props.theme.colors.button};
		box-shadow: 0.25rem 0.25rem black;
	}

	&:active {
		transform: translate(0%, -0%) scale(1);
		box-shadow: none;
	}

	@media (max-width: 768px) {
		// width: unset;
		// padding: 1rem 6rem;
		padding: 1rem 0rem;
		width: 80vw;
		margin-top: -2rem;
	}
`;

export default function Home() {
	const { context, setContext } = useContext(ContextProvider);
	console.log(context);

	return (
		<Wrapper>
			<Container>
				<Left>
					<TextContainer>
						<PromptPrint bg="black" pad="5px 10px">
							PROMPT
						</PromptPrint>
						<PromptPrint color="black" style={{ marginLeft: "-8px" }}>
							&nbsp; & PRINT
						</PromptPrint>
					</TextContainer>
					<TextContainer>
						<Main>
							GENERATE <br /> IDEAS INTO
						</Main>
						<MainSerif>
							YOUR <br /> ART
						</MainSerif>
					</TextContainer>
					<TextContainer>
						<Sub style={{ width: "75vw", maxWidth: "615px" }}>
							Make your mark on the art world with our personalized, AI-generated prints.
							Simply enter a prompt, and our algorithm creates one-of-a-kind print designs
							that are exclusive to you. Create a statement piece that is as personal as
							it is beautiful.
						</Sub>
					</TextContainer>
				</Left>
				<Right>
					<Link href="/generate">
						<StartCreatingButton>Start Creating</StartCreatingButton>
					</Link>
				</Right>
				<Bottom>
					<SubMobile style={{ width: "80vw", maxWidth: "615px", marginTop: "3rem" }}>
						Make your mark on the art world with our personalized, AI-generated prints.
						Simply enter a prompt, and our algorithm creates one-of-a-kind print designs
						that are exclusive to you. Create a statement piece that is as personal as it
						is beautiful.
					</SubMobile>
				</Bottom>
			</Container>
		</Wrapper>
	);
}
