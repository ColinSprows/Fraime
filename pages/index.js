import Image from "next/image";
import styled from "styled-components";

export const Wrapper = styled.div`
	background-color: ${props => props.theme.colors.background};
	height: calc(100vh - 4rem);
	display: flex;
`;

export const Container = styled.div`
	display: flex;
	flex-direction: row;
`

export const Left = styled.div`
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	justify-content: center;
	width: 60vw;
`

export const Right = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40vw;
`

export const TextContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: 2rem;
`;

export const PromptPrint = styled.h4`
	background-color: ${props => props.bg || "transparent"};
	color: ${props => props.color || props.theme.colors.background};
	padding: ${props => props.pad || "5px 0px"};
	border-radius: 50px;
	font-family: InterExtraBold;
	font-size: 1.5rem;
	font-weight: 100;
`;

export const Main = styled.h3`
	font-family: InterLight;
	font-size: 5rem;
	font-weight: 100;
	line-height: 0.9;
`;

export const MainSerif = styled.h3`
	font-family: DMSerifDisplayItalic;
	font-size: 5.25rem;
	line-height: 0.85;
	font-weight: 100;
	text-align: center;
`;

export const Sub = styled.h5`
	font-family: InterExtraLight;
	font-size: 1rem;
`;

export const StartCreatingButton = styled.button`
    background-color: ${props => props.theme.colors.button};
    color: black;
	padding: 1rem 6rem;
	border: 1px solid black;
	border-radius: 50px;
	font-family: InterBlack;
	font-size: 2rem;
	letter-spacing: -0.05em;
	white-space: nowrap;
`

export default function Home() {
	return (
		<Wrapper>
			<Container>
				<Left>
					<TextContainer>
						<PromptPrint 
							bg="black"
							pad="5px 10px"
						>
							PROMPT
						</PromptPrint>
						<PromptPrint
							color="black"
							style={{marginLeft: "-8px"}}
						>
							&nbsp; & PRINT
						</PromptPrint>
					</TextContainer>
					<TextContainer>
						<Main>GENERATE <br/> IDEAS INTO</Main>
						<MainSerif>YOUR <br/> ART</MainSerif>
					</TextContainer>
					<TextContainer>
						<Sub style={{width: '75vw', maxWidth: '615px'}}>
							Make your mark on the art world with our personalized, AI-generated prints. 
							Simply enter a prompt, and our algorithm creates one-of-a-kind print designs that are exclusive to you. 
							Create a statement piece that is as personal as it is beautiful.
						</Sub>
					</TextContainer>
				</Left>
				<Right>
					<StartCreatingButton>
						Start Creating
					</StartCreatingButton>
				</Right>
			</Container>
		</Wrapper>
	);
}
