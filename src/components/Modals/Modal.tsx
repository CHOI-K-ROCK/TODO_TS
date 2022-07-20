import React from 'react';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';

import { modalActions } from 'modules/modal';

const Container = styled.section`
  position: fixed;
  inset: 0;

  display: grid;
  place-items: center;
  background-color: rgba(0 0 0 / 0.2);

  z-index: 100;

  animation: appear 0.2s linear;

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Overlay = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: min(70vw, 350px);
  aspect-ratio: 16 / 9;

  background-color: #fff;

  box-shadow: 0 5px 8px rgba(0 0 0 / 0.5);

  border-radius: 10px;

  z-index: 101;

  animation: rise 0.2s linear;

  @keyframes rise {
    0% {
      transform: translateY(20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .msg {
    height: 40%;
    width: 80%;

    display: grid;
    place-items: center;
  }

  .btn_wrapper {
    display: flex;
    justify-content: space-around;

    width: 80%;
    margin-top: 10px;

    button {
      width: 80px;
      height: 30px;

      background-color: #fff;

      border: 2px solid #ddd;
      border-radius: 5px;

      font-size: 1rem;

      cursor: pointer;
      user-select: none;

      transition: 0.2s;

      &:hover {
        background-color: #000;
        border: #000;
        color: #fff;
      }
    }
  }
`;

interface IProps {
  msg?: string | null;
  type: 'single' | 'double' | null;
  applyFn: () => void | null;
}

function Modal({ msg, type, applyFn }: IProps): JSX.Element {
  const dispatch = useDispatch();

  const apply = () => {
    applyFn();
    dispatch(modalActions.closeModal());
  };

  const dismiss = () => {
    dispatch(modalActions.closeModal());
  };

  return (
    <Container>
      <Overlay>
        <div className="msg">{msg}</div>
        <div className="btn_wrapper">
          {type === 'single' && (
            <button type="button" className="apply" onClick={apply}>
              확인
            </button>
          )}
          {type === 'double' && (
            <>
              <button type="button" className="apply" onClick={apply}>
                예
              </button>
              <button type="button" className="dismiss" onClick={dismiss}>
                아니오
              </button>
            </>
          )}
        </div>
      </Overlay>
    </Container>
  );
}

Modal.defaultProps = {
  msg: '메시지를 입력하세요.',
};

export default Modal;
