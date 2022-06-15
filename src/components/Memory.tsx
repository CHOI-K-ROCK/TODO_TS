import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  display: grid;
  place-items: center;
  font-size: 2rem;
  width: 100%;
  height: 500px;
`;

const Char = styled.div<{ idx: number }>`
  display: inline-block;

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
            // eslint-disable-next-line react/no-array-index-key
            <Char key={idx} idx={idx}>
              {char}
            </Char>
          );
        })}
      </div>
    </Container>
  );
}

export default Memory;
