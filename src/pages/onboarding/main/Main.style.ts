import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh; /* 화면 높이 고정 */
  overflow: hidden; /* 스크롤 안 되게 */
  display: flex;
  justify-content: flex-start; /* 위에서부터 배치 */
  align-items: center;
  padding: 0px 24px 24px;
  box-sizing: border-box;
  background: #ffffff;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 430px; /* 모바일 기준 너비 제한 (원하면 조절) */
`;

export const LogoImg = styled.img`
  display: block;
  width: 380.414px;
  height: auto;
`;

export const StartButton = styled.button`
  width: 320px;
  height: 50px;
  border-radius: 14px;
  border: none;
  outline: none;
  background: #dfe678;
  color: #fffbfb;
  font-family: 'Inter';
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  margin-bottom: 27px; /* 버튼부터 텍스트까지 27px */
`;

export const LoginArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TextRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px; /* 두 문장 사이 간격 */
  white-space: nowrap; /* 한 줄로 유지 */
`;

export const QuestionText = styled.p`
  margin: 0;
  color: #7b7b7b;
  text-align: center;
  font-family: 'Pretendard';
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const LoginButtonText = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  color: #7b7b7b;
  text-align: center;
  font-family: 'Pretendard';
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  border-bottom: 1.3px solid #7b7b7b;
`;
