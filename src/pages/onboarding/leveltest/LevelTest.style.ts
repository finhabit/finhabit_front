import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  overflow-y: auto;
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 71px 30px 71px 30px;
  box-sizing: border-box;
  width: 100%;
  max-width: 393px;
  background: #ffffff;
`;

export const Title = styled.h1`
  margin: 0 0 40px 0;
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 1.4;
  text-align: center;
  white-space: nowrap;
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
  background: ${({ $active }) => ($active ? '#BEC372' : '#D9D9D9')};
  color: #fff;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: ${({ $active }) => ($active ? 'pointer' : 'default')};
  transition: background 0.15s ease;
`;

// 팝업창
export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(97, 97, 97, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 314px;
  height: 514px;
  padding: 34px 12px;
  border-radius: 30px;
  background: #fff;
  color: #848d00;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  line-height: 121.374%;
`;

export const PopupText = styled.div`
  text-align: center;
`;

export const PopupTitle = styled.h2`
  margin: 0;
  color: #848d00;
  font-size: 19px;
  font-weight: 500;
  line-height: 121.374%;
`;

export const PopupMessage = styled.p`
  margin: 0;
  color: #000;
  font-size: 18px;
  font-weight: 500;
  line-height: 121.374%;
  white-space: nowrap;
`;

export const PopupImage = styled.img`
  width: 183.798px;
  height: 303.502px;
  margin: 27px 0;
`;

export const PopupButton = styled.button`
  width: 266px;
  height: 42.045px;
  border-radius: 11px;
  border: none;
  background: #bec372;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;
