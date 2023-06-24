import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";

const OrderInfoContainer = styled.div`
	margin: 2em auto;
	width: clamp(600px, 70vw, 1000px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  background-color: white;
  padding: 0.75rem;
  border: 1px solid rgba(48,49,61, 0.15);
  border-radius: 5px;
`;

const Left = styled.div`
  width: 40%;
`

const Center = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Right = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
`;

const StyledText = styled.h3`
  font-family: Inter;
  font-size: 0.93rem;
  font-weight: 400;
  color: #30313d;
  margin-bottom: 0.5rem;
  text-align: left;
`

const Price = styled.h3`
  font-family: InterBold;
  font-size: 1.3rem;
  font-weight: 400;
  color: #30313d;
  text-align: left;
`

const LeftAlignedText = styled.div`
  text-align: start;
`

const OrderInfo = ({ order, orderTotal }) => {
  return (
    <OrderInfoContainer>
      {order && (
        <>
          <Left>
            <img src={order.image_id.url} alt="Order content" width="200px" height="200px"/>
          </Left>
          <Center>
            <LeftAlignedText>
              <StyledText>{order.product_size} {order.product_type}</StyledText>
              <StyledText>{order.framing_options} {order.framing_type}</StyledText>
              <StyledText>{order.paper_type}, {order.mat_options}</StyledText>
            </LeftAlignedText>
          </Center>
          <Right>
            <Image src="/icons/trash-icon.svg" alt="Trash icon" width={20} height={20}/>
            <Price>${orderTotal.toFixed(2)}</Price>
          </Right>  
            {/* <StyledText>Framing type: {order.framing_type}</StyledText>
            <StyledText>Framing options: {order.framing_options}</StyledText> */}
            {/* <StyledText>Product type: {order.product_type}</StyledText>
            <StyledText>Product size: {order.product_size}</StyledText> */}
            {/* <StyledText>Mat options: {order.mat_options}</StyledText>
            <StyledText>Paper type: {order.paper_type}</StyledText> */}
        </>
      )}
    </OrderInfoContainer>
  );
};

export default OrderInfo;
