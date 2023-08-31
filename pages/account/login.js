import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    margin: 6rem auto;
`

const Input = styled.input`
`

const Button = styled.button`
`

const StyledLink = styled(Link)`
`

export default function login() {
    return (
        <Wrapper>
            <div>login</div>
            <Input type="text" placeholder="email" />
            <Input type="password" placeholder="password" />
            <Button>login</Button>
            <span>
                Don't have an account?
                <StyledLink href="/account/signup">Sign Up</StyledLink>
            </span>
        </Wrapper>
    )
}