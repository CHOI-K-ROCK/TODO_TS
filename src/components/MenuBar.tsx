import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.section`
  position: relative;
  width: 100%;
  margin-top: 40px;
  margin-bottom: 40px;

  box-sizing: border-box;
  border: 2px solid #ddd;
  border-radius: calc(1.5rem + 10px);

  .buttonWrapper {
    /* position: relative; */

    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

const IndicatorWrapper = styled.div<{ currentPath: string }>`
  position: absolute;

  display: grid;
  grid-template-columns: 1fr 1fr;

  width: 100%;
  height: 100%;

  z-index: -1;

  .indicator {
    height: 100%;
    background-color: #000;

    border-radius: calc(1.5rem + 10px);

    transition: 0.5s;

    transform: ${(props) =>
      props.currentPath === 'todo' && 'translateX(calc(100% * 0))'};
    transform: ${(props) =>
      props.currentPath === 'memory' && 'translateX(calc(100% * 1))'};
  }
`;

const SLink = styled(Link)`
  font-size: 1.5rem;
  display: grid;
  place-items: center;

  width: 100%;
  padding: 5px 0;

  text-decoration: none;

  transition: 0.2s;

  &:visited {
    color: #000;
  }

  &:hover {
    font-weight: bold;
  }

  &.active {
    color: #fff;
  }
`;
// interface IProps {}

function MenuBar(): JSX.Element {
  const todoBtn = useRef<HTMLAnchorElement>(null);
  const memoryBtn = useRef<HTMLAnchorElement>(null);

  const [currentPath, setCurrentPath] = useState<string>('');

  useEffect(() => {
    setCurrentPath(window.location.pathname.split('/')[1]);
  }, [currentPath]);
  // 새로고침 혹은 페이지 접속 시 현재 경로를 가져온다.

  useEffect(() => {
    if (currentPath === 'todo') {
      todoBtn.current?.classList.add('active');
      memoryBtn.current?.classList.remove('active');
    }
    if (currentPath === 'memory') {
      memoryBtn.current?.classList.add('active');
      todoBtn.current?.classList.remove('active');
    }
  }, [currentPath]);

  return (
    <Container>
      <div className="buttonWrapper">
        <IndicatorWrapper currentPath={currentPath}>
          <div className="indicator" />
        </IndicatorWrapper>
        <SLink to="todo" ref={todoBtn} onClick={() => setCurrentPath('/todo')}>
          todo
        </SLink>
        <SLink
          to="memory"
          ref={memoryBtn}
          onClick={() => setCurrentPath('/memory')}
        >
          memory
        </SLink>
      </div>
    </Container>
  );
}

export default MenuBar;
