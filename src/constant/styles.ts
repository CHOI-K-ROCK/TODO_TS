/* eslint-disable import/prefer-default-export */
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyles = createGlobalStyle`
    ${reset}

    body * {
      font-family: 'NanumSquareRound';
    }

    a {
      color: #000;
      user-select: none;
    }

    button {
      color: #000;
      user-select: none;
    }
  `;
