import Image from "next/image";
import styled from "styled-components";

export const Wrapper = styled.div`
	background-color: ${props => props.theme.colors.background};
	height: 100vh;
`;

export const Main = styled.h3`
	font-family: DMSerifDisplayItalic;
	font-size: 5rem;
`;

export const Sub = styled.h3`
	font-family: Inter;
	font-size: 0.5rem;
`;

export default function Home() {
	return (
		<Wrapper>
			<Main>
				this should be inter <br />
			</Main>
			<Sub>
				also..... weiner
			</Sub>
		</Wrapper>
	);
}
