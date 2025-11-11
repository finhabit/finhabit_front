import styled, { css, keyframes } from "styled-components";

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

export const N_Section = styled.div`
  font-size: 14px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const ContentBox = styled.div`
  width: 321px;
  min-height: 213px;
  max-height: 263px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  border-radius: 23px;
  background: #dfe67880;
  padding: 36px 8px;
  margin: 10px 0;
  box-shadow: 0 3px 8px rgba(150, 150, 150, 0.25);
`;

export const ContentBox1 = styled.div`
  width: 321px;
  min-height: 253px;
  max-height: 303px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 23px;
  border: 2px solid #dfe678;
  padding: 16px 8px;
  margin: 10px 0;
  box-shadow: 0 3px 8px rgba(150, 150, 150, 0.25);
`;

export const RemindingSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 35px;
`;

export const PerQuiz = styled.div`
  display: flex;
  flex-direction: column;
`;

export const QuizTitle = styled.div`
  font-weight: 500;
  font-size: 14px;
  margin: 8px 0;
`;

export const QuizChoice = styled.div`
  display: flex;
  gap: 3px;
  flex-wrap: wrap;
  justify-content: center;
  font-weight: 500;
  font-size: 14px;
`;

const correctAnim = keyframes`
  0% { transform: scale(1); }
  60% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

export const PerChoice = styled.div<{
  selected?: boolean;
  correct?: boolean;
  wrong?: boolean;
  showAnswer?: boolean;
  isAnswer?: boolean;
}>`
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease;
  user-select: none;

  ${({ correct }) =>
    correct &&
    css`
      color: #848d00;
      animation: ${correctAnim} 0.3s ease forwards;
      font-weight: 600;
    `}

  ${({ wrong }) =>
    wrong &&
    css`
      color: #b20808ff;
      text-decoration: line-through;
    `}

  ${({ showAnswer, isAnswer }) =>
    showAnswer &&
    isAnswer &&
    css`
      color: #848d00;
      font-weight: 600;
    `}
`;
