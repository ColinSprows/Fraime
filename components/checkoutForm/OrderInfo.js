import React from "react";
import styled from "styled-components";

const OrderInfoContainer = styled.div`
	margin: 2em auto;
	width: 70vw;
	width: clamp(600px, 70vw, 1000px);
`;

const StyledText = styled.h3`
    font-family: Inter;
    font-size: 0.93rem;
    font-weight: 400;
    color: #30313d;
    margin-bottom: 0.5rem;
`

const OrderInfo = ({ order }) => {
  return (
    <OrderInfoContainer>
      {order && (
        <>
          <StyledText>Framing type: {order.framing_type}</StyledText>
          <StyledText>Framing options: {order.framing_options}</StyledText>
          <StyledText>Mat options: {order.mat_options}</StyledText>
          <StyledText>Product type: {order.product_type}</StyledText>
          <StyledText>Product size: {order.product_size}</StyledText>
          <StyledText>Paper type: {order.paper_type}</StyledText>
        </>
      )}
    </OrderInfoContainer>
  );
};

export default OrderInfo;
