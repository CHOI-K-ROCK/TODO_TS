import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  .default_page {
    display: grid;
    place-items: center;
    box-sizing: border-box;
    height: 680px;

    font-size: 1.2rem;
    color: #777;
  }
`;

function DefaultPage(): JSX.Element {
  return (
    <Container>
      <div className="default_page">
        <p>선택된 노트가 없습니다.</p>
      </div>
    </Container>
  );
}

export default DefaultPage;
