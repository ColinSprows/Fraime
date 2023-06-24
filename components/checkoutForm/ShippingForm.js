import React, { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    margin: 2em auto;
	width: clamp(600px, 70vw, 1000px);
`

const StyledLabel = styled.label`
    font-family: Inter;
    font-size: 0.93rem;
    font-weight: 400;
    color: #30313d;
    margin-bottom: 0.5rem;
`

const StyledInput = styled.input`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid rgba(48,49,61, 0.15);
    border-radius: 5px;
    margin-top: 0.5rem;
`

const StateZipContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    width: 100%;
`;

export const CheckoutText = styled.h3`
	font-family: DMSerifDisplay-Regular;
	font-size: clamp(1rem, 2vw, 3rem);
	white-space: nowrap;
	font-weight: 100;
	text-align: center;
	color: black;
`;


const ShippingForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, address, state, zipCode });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <CheckoutText>Shipping Information</CheckoutText>
      <StyledLabel>
        Name
        <StyledInput type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
      </StyledLabel>
      <StyledLabel>
        Address
        <StyledInput type="text" value={address} onChange={(e) => setAddress(e.target.value)} required/>
      </StyledLabel>
      <StateZipContainer>
        <StyledLabel>
            State
            <StyledInput type="text" value={state} onChange={(e) => setState(e.target.value)} required/>
        </StyledLabel>
        <StyledLabel>
            Zip Code
            <StyledInput type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required/>
        </StyledLabel>
      </StateZipContainer>
      {/* <StyledInput type="submit" value="Submit" /> */}
    </StyledForm>
  );
};

export default ShippingForm;
