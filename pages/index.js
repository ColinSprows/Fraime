import Image from "next/image";
import styled from "styled-components";

export const Main = styled.h3`
	font-family: DMSerifDisplayItalic;
	font-size: 5rem;
`;

export default function Home() {
	return (
		<>
			<Main>
				this should be inter
			</Main>
		</>
	);
}
