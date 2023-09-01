import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    margin: 6rem auto;
`

const AccountDetails = styled.div`
`

const Detail = styled.div`
`

const Button = styled.button`
`

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
`

export default function Profile() {
    const [changePassword, setChangePassword] = useState('')
    
    const handleClick = () => {
        setChangePassword(true)
    }
  return (
    <Wrapper>
        <AccountDetails>
            <Detail>Email: </Detail>
            <Detail onClick={handleClick}>Change Password</Detail>
            {changePassword &&
                <InputWrapper>
                    <Input type="password" placeholder="Old Password" />
                    <Input type="password" placeholder="New Password" />
                    <Button>Set new password</Button>
                </InputWrapper>
            }
        </AccountDetails>
        <Button>Logout</Button>
        <Button>Delete Account</Button>
    </Wrapper>

  )
}