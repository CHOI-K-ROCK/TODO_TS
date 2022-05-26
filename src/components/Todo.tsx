import React from 'react';
import styled from 'styled-components';

const Container = styled.section``;

interface IProps {
  content: string;
}

function Todo({ content }: IProps): JSX.Element {
  return (
    <Container>
      <p>{content}</p>
    </Container>
  );
}

export default Todo;
