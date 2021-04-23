import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 25px;
  left: 25px;
  z-index: 5;
  font-size: 24pt;
  background-color: #fff;
  border: 1px solid #aaa;
  padding: 3px;
`;

const Accuracy = ({ text }) => (
  <Wrapper>
    { text }
  </Wrapper>
);

export default Accuracy;
