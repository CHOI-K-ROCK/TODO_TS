import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  display: grid;
  place-items: center;
  font-size: 2rem;
  width: 100%;
  height: 500px;

  .charWrapper {
    display: flex;
  }
`;

const Char = styled.div<{ idx: number }>`
  letter-spacing: 3px;
  animation: wave 1s calc(0.1s * ${(props) => props.idx}) linear infinite;

  @keyframes wave {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-5px);
    }

    100% {
      transform: translateY(0);
    }
  }
`;
// interface Props {}

function Memory(): JSX.Element {
  const text = 'Developing....';

  return (
    <Container>
      <div className="charWrapper">
        {text.split('').map((char, idx) => {
          return (
            <Char key={char} idx={idx}>
              {char}
            </Char>
          );
        })}
      </div>
    </Container>
  );
}

export default Memory;
