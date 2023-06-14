import styled from "styled-components";

export const Main = styled.h3`
	font-family: InterLight;
	font-size: clamp(2.5rem, 7vw, 5rem);
	white-space: nowrap;
	font-weight: 100;
	line-height: 0.9;
	color: black;
`;

export const MainSerif = styled.h3`
	font-family: DMSerifDisplayItalic;
	font-size: clamp(2.5rem, 7.25vw, 5.25rem);
	line-height: 0.85;
	font-weight: 100;
	text-align: center;
	color: black;
`;

export const Sub = styled.h5`
	font-family: InterExtraLight;
	font-size: clamp(0.5rem, 3vw, 1rem);
	color: black;

	@media (max-width: 768px) {
		display: none;
	}
`;

export const SubMobile = styled.h5`
	font-family: InterExtraLight;
	font-size: clamp(0.5rem, 3vw, 1rem);
	color: black;
`;