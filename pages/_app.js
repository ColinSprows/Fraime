import "@/styles/globals.css";
import styled from "styled-components";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import GlobalStyle, { theme } from "../styles/globalStyles";
import Header from "../components/header";
import { ContextProvider } from "@/context/ContextProvider";

export const Wrapper = styled.div`
	// was breaking on larger screens
	// max-width: 1600px;
	margin: 0 auto;
	position: relative;
	min-height: 100vh;
`;

export const Container = styled.div`
	padding: 0px 0px;
`;

function MyApp({ Component, pageProps }) {
	return (
		<>
			<ContextProvider>
				<ThemeProvider theme={theme}>
					<Head>
						<title>Fraime</title>
						<meta name="description" content="Generated by create next app" />
						<meta name="viewport" content="width=device-width, initial-scale=1" />
						<link rel="icon" href="/favicon.ico" />
					</Head>
					<Header />
					<Wrapper>
						<Container>
							<Component {...pageProps} />
							<GlobalStyle />
						</Container>
					</Wrapper>
				</ThemeProvider>
			</ContextProvider>
		</>
	);
}

export default MyApp;
