import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;               /* 화면 높이 고정 */
  overflow: hidden;  
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background: #ffffff;
`;

export const Content = styled.form`
  display: flex;
  width: 393px;
  padding: 194px 41px 255px 41px;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  margin: 0 auto;
`;

export const Title = styled.h1`
  width: 100%;
  margin: 0 0 24px 0;
  color: #000;
  font-family: "Inter";
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
  width: 310px;
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
  font-family: "Inter";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  ::placeholder {
    color: #ccc;
    font-family: "Inter";
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
  width: 310px;
  height: 49px;
  border-radius: 11px;
  border: none;
  background: ${({ $active }) => ($active ? "#DFE678" : "#D9D9D9")};
  color: #fff;
  font-family: "Inter";
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: ${({ $active }) => ($active ? "pointer" : "default")};
  transition: background 0.15s ease;
`;
