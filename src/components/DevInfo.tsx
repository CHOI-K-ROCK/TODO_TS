import React from 'react';

import styled from 'styled-components';
import { GoPerson, GoMarkGithub } from 'react-icons/go';

const Info = styled.div`
  position: absolute;
  right: 40px;
  top: 40px;

  .icon_wrapper {
    display: flex;
    gap: 15px;

    .icon {
      font-size: 2.4rem;
      cursor: pointer;
    }
  }
`;

function DevInfo() {
  return (
    <Info>
      <div className="icon_wrapper">
        <GoPerson
          className="icon"
          onClick={() =>
            window.open('https://github.com/CHOI-K-ROCK/', '_blank')
          }
        />
        <GoMarkGithub
          className="icon"
          onClick={() =>
            window.open('https://github.com/CHOI-K-ROCK/memory_todo', '_blank')
          }
        />
      </div>
    </Info>
  );
}

export default DevInfo;
