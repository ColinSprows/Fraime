import styled from 'styled-components';
import Image from 'next/image';

const HeaderContainer = styled.div`
  background-color: ${props => props.theme.colors.header};
  height: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 0px 0px 12px;
  margin: 0px 0px;
  border-bottom: 1px solid black;
`;

const Left = styled.div`
  align-self: center;
`

const Right = styled.div`
  display: flex;
  align-items: stretch;
`

const Login = styled.button`
  font-family: InterExtraLight;
  background: none;
  border: none;
  font-weight: 600;
  padding: 0rem 1rem;
  align-self: center;
`

const StartCreating = styled.button`
  font-family: InterExtraLight;
  background: black;
  border: none;
  padding: 0rem 2rem;
  color: white;
  margin-left: 1rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Divider = styled.div`
  height: 100%;
  border-right: 1px solid black;
  margin: 0 1rem;  // Adding margin to give some space around the divider
`;

export default function Header() {
    return (
        <HeaderContainer>
            <Left>
                {/* <Image 
                    src="/fraime-logo.svg" 
                    alt="Fraime" 
                    width={30}
                    height={30}
                /> */}
                <h1>F</h1>
            </Left>
            <Right>
                <Divider />
                <Login>Login</Login>
                <StartCreating>Start Creating</StartCreating>
            </Right>
        </HeaderContainer>
    )
  }
