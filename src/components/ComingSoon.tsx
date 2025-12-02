import styled, { keyframes } from 'styled-components';
import loadingIcon from '@/assets/loading.svg';

interface ComingSoonProps {
  onClick?: () => void;
}

const ComingSoon = ({ onClick }: ComingSoonProps) => {
  return (
    <Overlay onClick={onClick}>
      <Spinner src={loadingIcon} alt="로딩중" />
      <Message>추후 확장 예정입니다</Message>
      <SubMessage>(화면을 터치하면 닫힙니다)</SubMessage>
    </Overlay>
  );
};

export default ComingSoon;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 414px;
  height: 100vh;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Spinner = styled.img`
  width: 87px;
  height: 87px;
  animation: ${rotate} 3s linear infinite;
  margin-bottom: 20px;
`;

const Message = styled.div`
  color: white;
  font-size: 22px;
  font-weight: 600;
  margin-top: 70px;
  margin-bottom: 8px;
`;

const SubMessage = styled.div`
  color: #ddd;
  font-size: 13px;
  font-weight: 400;
`;
