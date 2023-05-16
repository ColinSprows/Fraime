import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
  padding: 0rem 2rem;
  align-self: center;
  height: 100%;
  cursor: pointer;
`

const StartCreating = styled.button`
  font-family: InterExtraLight;
  background: black;
  border: none;
  padding: 0rem 2rem;
  color: white;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const Divider = styled.div`
  height: 100%;
  border-right: 1px solid black;
`;

export default function Header() {
  const router = useRouter();
  // Check if the current path is the homepage
  const isHomepage = router.pathname === '/';

  return (
    <HeaderContainer>
      <Left>
        <Link href="/">
          {/* <Image 
              src="/fraime-logo.svg" 
              alt="Fraime" 
              width={30}
              height={30}
          /> */}
          <h1>F</h1>
        </Link>
      </Left>
      <Right>
        <Divider />
        <Login>Login</Login>
        {isHomepage && (
        <Link href="/generate">
          <StartCreating>Start Creating</StartCreating>
        </Link>
        )}
      </Right>
    </HeaderContainer>
  )
  }
