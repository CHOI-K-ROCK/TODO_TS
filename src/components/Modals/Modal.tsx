import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  position: fixed;
  inset: 0;

  display: grid;
  place-items: center;
  background-color: rgba(0 0 0 / 0.2);

  z-index: 100;
`;

const Modal = styled.div`
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

  @keyframes identifier {
    0% {
      transform: translateY(-20px);
      opacity: 0;
    }
    0% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .close_btn {
    position: absolute;
    top: 15px;
    right: 15px;

    display: grid;
    place-items: center;

    width: 2rem;
    height: 2rem;
    padding: 0;
    padding-top: 2px;

    background: none;
    border: none;
    border-radius: 10px;

    font-size: 1.5rem;

    cursor: pointer;

    &:hover {
      background-color: #000;
      color: #fff;
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
  msg?: string;
  type: 'single' | 'double';
  applyFn: () => void;
  dismissFn?: () => void;
}

function TwoBtnModal({ msg, type, applyFn, dismissFn }: IProps): JSX.Element {
  const apply = () => {
    applyFn();
  };

  const dismiss = () => {
    if (dismissFn) {
      dismissFn();
    }
  };
  return (
    <Container>
      <Modal>
        <button type="button" className="close_btn">
          ✕
        </button>
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
      </Modal>
    </Container>
  );
}

TwoBtnModal.defaultProps = {
  msg: '메시지를 입력하세요.',
  dismissFn: null,
};

export default TwoBtnModal;
