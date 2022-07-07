import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { BsCaretRightFill as LeftIcon } from 'react-icons/bs';

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
    0% {
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

  width: min(70vw, 500px);
  height: max-content;
  min-height: 300px;

  box-sizing: border-box;
  padding: 30px;

  background-color: #fff;

  box-shadow: 0 5px 8px rgba(0 0 0 / 0.5);

  border-radius: 10px;

  z-index: 101;

  animation: rise 0.2s linear;

  @keyframes rise {
    0% {
      transform: translateY(-20px);
      opacity: 0;
    }
    0% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
const CloseBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  .close_btn {
    display: grid;
    place-items: center;

    width: 2rem;
    height: 2rem;
    padding: 0;
    padding-top: 4px;

    background: none;
    border: none;
    border-radius: 10px;

    font-size: 1.5rem;

    transition: 0.1s;

    cursor: pointer;

    &:hover {
      background-color: #000;
      color: #fff;
    }
  }
`;
const TitleWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;

  h3 {
    margin-bottom: 15px;
    font-size: 1.3rem;
    font-weight: bold;

    padding: 15px 0;

    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }

  .question {
    font-size: 1.1rem;
    line-height: 25px;
  }
`;

const KeywordsWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;

  .wrapper {
    display: flex;
    margin-bottom: 15px;

    padding: 15px 0;

    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;

    h3 {
      font-size: 1.1rem;
    }

    button {
      background: none;
      border: none;
    }
  }

  .keyword_wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    max-height: 200px;

    transition: 0.2s;

    &.hide {
      max-height: 0;
      overflow: hidden;
    }

    .keyword {
      position: relative;
      z-index: 1;

      width: max-content;
      min-width: 30px;
      height: max-content;
      padding: 5px 7px;

      background-color: #fff;

      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
      border-radius: 100vmax;

      font-size: 0.9rem;
      text-align: center;

      user-select: none;

      cursor: pointer;

      &:hover::after {
        content: '구글에서 해당 키워드를 검색합니다.';
        position: absolute;
        bottom: -30px;
        left: 0;
        display: block;

        width: max-content;
        padding: 5px;

        z-index: 1;

        font-size: 0.8rem;
        color: #fff;
        background-color: #000;

        animation: appear 0.2s linear;

        @keyframes appear {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      }
    }
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;

  .wrapper {
    display: flex;
    margin-bottom: 15px;

    padding: 15px 0;

    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;

    h3 {
      font-size: 1.1rem;
    }

    button {
      background: none;
      border: none;
    }
  }

  .content {
    min-height: 200px;
    max-height: 300px;
    overflow: auto;

    transition: 0.2s;

    &.hide {
      min-height: 0;
      max-height: 0;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;

  button {
    display: grid;
    place-items: center;

    width: 2.5rem;
    height: 2.5rem;
    padding: 0;

    background: none;

    border: 1px solid #777;
    border-radius: 50%;

    font-size: 2rem;
    color: #777;

    cursor: pointer;
  }
`;

interface IProps {
  setShowRandomNote: React.Dispatch<React.SetStateAction<boolean>>;
}

interface INote {
  id: string;
  title: string;
  keywords: string[];
  content: string;
}

function RandomNote({ setShowRandomNote }: IProps): JSX.Element {
  // 전역상태 불러오기
  const notesSlice = useSelector(
    (state: { notesSlice: { notes: INote[] } }) => {
      return state.notesSlice.notes;
    }
  );

  // 공용 함수 작성
  function getRandomIdx(num: number) {
    return Math.floor(Math.random() * num);
  }

  // 상태 작성
  const [currentQuestion, setCurrentQuestion] = useState<INote>(
    notesSlice[getRandomIdx(notesSlice.length)]
  );
  const [isOpenKeywords, setOpenKeywords] = useState<boolean>(false);
  const [isOpenContent, setOpenContent] = useState<boolean>(false);

  // 컴포넌트 내부 함수 작성
  const searchOnGoogle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;
    window.open(
      `https://www.google.com/search?q=${target.innerText}`,
      '_blank'
    );
  };

  const toggleKeywordsStat = () => {
    setOpenKeywords(!isOpenKeywords);
  };

  const toggleContentStat = () => {
    setOpenContent(!isOpenContent);
  };

  return (
    <Container>
      {/* 총 질문을 스택에 쌓이게 해서 구현 해보기 */}
      {/* 다음 노트 버튼 */}
      <Overlay>
        {/* 종료 버튼 */}
        <CloseBtnWrapper>
          <button
            type="button"
            className="close_btn"
            onClick={() => setShowRandomNote(false)}
          >
            ✕
          </button>
        </CloseBtnWrapper>
        {/* 타이틀  */}
        <TitleWrapper>
          <h3>질문</h3>
          <p className="question">{currentQuestion.title}</p>
        </TitleWrapper>

        {/* 키워드 */}
        <KeywordsWrapper>
          <div className="wrapper">
            <h3>키워드 보기</h3>
            <button type="button" onClick={toggleKeywordsStat}>
              {isOpenKeywords ? '닫기' : '열기'}
            </button>
          </div>
          <div
            className={
              isOpenKeywords ? 'keyword_wrapper' : 'keyword_wrapper hide'
            }
          >
            {currentQuestion.keywords.map((keyword, idx) => {
              return (
                <div
                  className="keyword"
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  onClick={(e) => {
                    searchOnGoogle(e);
                  }}
                >
                  {keyword}
                </div>
              );
            })}
          </div>
        </KeywordsWrapper>

        {/* 본문 */}
        <ContentWrapper>
          <div className="wrapper">
            <h3>본문 보기</h3>
            <button type="button" onClick={toggleContentStat}>
              {isOpenContent ? '닫기' : '열기'}
            </button>
          </div>
          <pre className={isOpenContent ? 'content' : 'content hide'}>
            {currentQuestion.content}
          </pre>
        </ContentWrapper>
        <ButtonWrapper>
          <button
            type="button"
            className="next_btn"
            onClick={() =>
              setCurrentQuestion(notesSlice[getRandomIdx(notesSlice.length)])
            }
          >
            <LeftIcon />
          </button>
        </ButtonWrapper>
      </Overlay>
    </Container>
  );
}

export default RandomNote;
