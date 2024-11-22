import React from 'react';
import styled from 'styled-components';

const Title = styled.section`
  font-family: 'NanumGothicCodingLigature';

  width: 100%;

  font-size: 3rem;
  text-align: center;
  letter-spacing: 0.1rem;

  user-select: none;

  @media screen and (max-width: 640px) {
    font-size: 2rem;
  }
`;

function Logo() {
  return <Title>&lt; memoryTodo /&gt;</Title>;
}

export default Logo;
