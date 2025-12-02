import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  overflow-y: auto; /* 스크롤로 넘기기 */
  display: flex;
  justify-content: center;
  background: #f5f5f5; /* 필요 없으면 흰색으로 돌려도 됨 */
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 패딩 줄여서 타이틀이 한 줄에 들어가도록 여유 확보 */
  padding: 71px 30px 71px 30px;
  box-sizing: border-box;
  width: 100%;
  max-width: 393px; /* 모바일 기준 너비 */
  background: #ffffff;
`;

export const Title = styled.h1`
  margin: 0 0 40px 0;
  color: #000;
  font-family: "Pretendard", sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 1.4;
  text-align: center;
  white-space: nowrap; /* "금융 지식을 얼마나 아는지 확인하기!" 한 줄 유지 */
`;

export const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px; /* 각 질문 카드 간격 22px */
  margin-bottom: 22px;
`;

interface SubmitButtonProps {
    $active: boolean;
}

export const SubmitButton = styled.button<SubmitButtonProps>`
  width: 310px;
  height: 49px;
  border-radius: 11px;
  border: none;
  background: ${({ $active }) => ($active ? "#BEC372" : "#D9D9D9")};
  color: #fff;
  font-family: "Inter", sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: ${({ $active }) => ($active ? "pointer" : "default")};
  transition: background 0.15s ease;
`;
