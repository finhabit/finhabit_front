import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 193px 41px 414px 41px;
  box-sizing: border-box;
  background: #ffffff;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  width: 100%;
  margin: 0 0 24px 0;
  color: #000;
  font-size: 21px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: left;
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px; /* 각 입력창 사이 12px */
  margin-bottom: 17px;
`;

export const InputWrapper = styled.div`
  width: 100%;
  height: 49px;
  border-radius: 11px;
  border: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  padding: 0 14px;
  box-sizing: border-box;
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;

  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  ::placeholder {
    color: #ccc;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

interface SignupButtonProps {
  $active: boolean;
}

export const SignupButton = styled.button<SignupButtonProps>`
  width: 100%;
  height: 49px;
  border-radius: 11px;
  border: none;
  background: ${({ $active }) => ($active ? '#DFE678' : '#D9D9D9')};
  color: #fff;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: ${({ $active }) => ($active ? 'pointer' : 'default')};
  transition: background 0.15s ease;
`;

export const ErrorMessage = styled.span`
  color: #ff4d4f;
  font-size: 10px;
  display: flex;
  margin: -5px 5px;
`;
