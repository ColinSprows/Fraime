import React, { useState } from 'react'
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
    const [isSubmitted, setIsSubmitted] = useState(false)
    return (
        <Wrapper>
            <div>Signup</div>
            <Input type="text" placeholder="email" />
            <Input type="password" placeholder="password" />
            {isSubmitted &&
                <div>
                    <span>email sent, enter verification code below</span>
                    <Input type="text" placeholder="verification code" />
                </div>
            }
            <Button>Signup</Button>
        </Wrapper>
    )
}