import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.section`
  .default_page {
    display: grid;
    place-items: center;

    height: 600px;

    font-size: 1.2rem;
    color: #777;

    .note_not_found {
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        margin-bottom: 20px;

        &:nth-child(2) {
          font-size: 1rem;
          margin-bottom: 30px;
        }
      }
    }
  }
`;

interface IProps {
  amount: number;
}

function DefaultPage({ amount }: IProps): JSX.Element {
  return (
    <Container>
      <div className="default_page">
        {amount ? (
          <p>선택된 노트가 없습니다.</p>
        ) : (
          <div className="note_not_found">
            <p>작성된 노트가 없습니다.</p>
            <p>아래 버튼을 눌러 노트를 추가하세요.</p>
            <Link to="add">add</Link>
          </div>
        )}
      </div>
    </Container>
  );
}

export default DefaultPage;
