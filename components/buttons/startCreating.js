import styled from "styled-components";

export const Button = styled.button`
    background-color: ${props => props.theme.colors.button};
    color: black;
`

export default function StartCreatingButton() {
    return <Button>Start Creating</Button>
}