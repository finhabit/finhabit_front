import styled, { css } from 'styled-components';

export const UpLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 40px 35px 20px 35px;
  font-size: 22px;
  font-weight: 500;
`;

export const Icons = styled.img`
  position: absolute;
  left: 0;
  height: 20px;
  cursor: pointer;
`;

export const RemindingSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 35px;
  padding-bottom: 50px;
`;

export const N_Section = styled.div`
  font-size: 14px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

export const ContentBox = styled.div`
  width: 321px;
  min-height: 213px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 23px;
  background: #dfe67875;
  padding: 30px 20px;
  margin: 10px 0;
  box-shadow: 0 3px 8px rgba(150, 150, 150, 0.25);
  box-sizing: border-box;
  text-align: center;
  transition: all 0.5s ease;
`;

export const QuizTitle = styled.div`
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 15px;
  line-height: 1.4;
  word-break: keep-all;
`;

export const QuizChoicesText = styled.div<{ $isCorrect?: boolean }>`
  width: 100%;
  transition: all 0.5s ease;
  & > div {
    transition: all 0.5s ease;
  }

  ${({ $isCorrect }) =>
    $isCorrect
      ? css`
          display: flex;
          justify-content: center;
          flex-wrap: nowrap;
          gap: 5px;
          font-size: 12px;
          font-weight: 500;
          text-align: center;
          line-height: 1.5;
          letter-spacing: -0.5px;

          & > div {
            white-space: nowrap;
          }
        `
      : css`
          display: block;
          font-size: 13px;
          font-weight: 600;
          text-align: left;
          padding-left: 10px;
          line-height: 1.6;

          & > div {
            display: block;
            margin-bottom: 8px;
          }
        `}
`;

export const HighlightText = styled.span<{ $isCorrect?: boolean }>`
  ${({ $isCorrect }) =>
    $isCorrect &&
    css`
      color: #848d00;
      font-weight: 700;
    `}
`;

export const ExplanationBox = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.5s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ExplanationTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const ExplanationDesc = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  word-break: keep-all;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
  justify-content: center;
`;

export const NumberBtn = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: #dfe67875;
  font-size: 20px;
  font-weight: 600;
  color: #000;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
`;

export const FeedbackRow = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;

export const BigCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 8px solid #d9d9d9;
  box-sizing: border-box;
`;

export const BigX = styled.div`
  width: 60px;
  height: 60px;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 70px;
    background-color: #dc6d6d;
    border-radius: 5px;
    top: 50%;
    left: 50%;
  }
  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

export const MoreLink = styled.div`
  margin-top: 20px;
  color: #848d00;
  font-size: 15px;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
`;

export const CollectionBox = styled.div`
  width: 321px;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 23px;
  border: 2px solid #dfe67875;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 0 3px 8px rgba(150, 150, 150, 0.25);
  box-sizing: border-box;
  background-color: #fff;
`;

export const HistoryItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-size: 13px;
  font-weight: 500;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const HistoryDate = styled.div`
  color: #888;
  width: 75px;
`;

export const HistoryTitle = styled.div`
  flex: 1;
  text-align: left;
  padding: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333;
  font-weight: 600;
`;

export const HistoryResult = styled.div<{ $isCorrect: boolean }>`
  width: 30px;
  text-align: right;
  font-weight: 700;
  color: ${({ $isCorrect }) => ($isCorrect ? '#17a1fa' : '#dc6d6d')};
`;
