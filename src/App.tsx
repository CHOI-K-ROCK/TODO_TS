import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Input from './components/Input';

const GlobalStyles = createGlobalStyle`
    ${reset}
  `;

const Container = styled.section`
  background-color: #888;
`;

function App(): JSX.Element {
  return (
    <Container>
      <GlobalStyles />
      <h1>hello world.</h1>
      <Input content="content" />
    </Container>
  );
}

export default App;
