import { createGlobalStyle } from "styled-components";

export const theme = {
	colors: {
		black: "#000",
		background: "#FFF9E7",
		header: "#E8E3D5",
		button: "#F3AC3C",
	},
};

const GlobalStyle = createGlobalStyle`
  html, body, #__next {
    background: ${theme.colors.background};
  }
  @font-face {
    font-family: InterThin;
    src: url('/fonts//Inter/Inter-Thin.ttf') format('truetype');
  }
  @font-face {
    font-family: InterExtraLight;
    src: url('/fonts//Inter/Inter-ExtraLight.ttf') format('truetype');
  }
  @font-face {
    font-family: InterLight;
    src: url('/fonts//Inter/Inter-Light.ttf') format('truetype');
  }
  @font-face {
    font-family: Inter;
    src: url('/fonts//Inter/Inter-Regular.ttf') format('truetype');
  }
  @font-face {
    font-family: InterMedium;
    src: url('/fonts//Inter/Inter-Medium.ttf') format('truetype');
  }
  @font-face {
    font-family: InterSemiBold;
    src: url('/fonts//Inter/Inter-SemiBold.ttf') format('truetype');
  }
  @font-face {
    font-family: InterBold;
    src: url('/fonts//Inter/Inter-Bold.ttf') format('truetype');
  }
  @font-face {
    font-family: InterExtraBold;
    src: url('/fonts//Inter/Inter-ExtraBold.ttf') format('truetype');
  }
  @font-face {
    font-family: InterBlack;
    src: url('/fonts//Inter/Inter-Black.ttf') format('truetype');
  }
  @font-face {
    font-family: DMSerifDisplay;
    src: url('/fonts//DMSerifDisplay/DMSerifDisplay.ttf') format('truetype');
  }
  @font-face {
    font-family: DMSerifDisplayItalic;
    src: url('/fonts//DMSerifDisplay/DMSerifDisplay-Italic.ttf') format('truetype');
  }
`;
export default GlobalStyle;
