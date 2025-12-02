import styled from "styled-components";

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
  margin: 0 0 28px 0;
  color: #000;
  font-family: "Inter";
  font-size: 19px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: left;
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
  font-family: "Inter", sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  ::placeholder {
    color: #ccc;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

export const LoginButton = styled.button`
  width: 310px;
  height: 49px;
  margin-top: 16px;
  border-radius: 11px;
  border: none;
  background: #d9d9d9;
  color: #fff;
  font-family: "Inter", sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
`;

export const HelperRow = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const HelperText = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  color: #d9d9d9;
  font-family: "Inter", sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
`;

export const Divider = styled.div`
  width: 1px;
  height: 15px;
  background: #ccc;
`;

export const SignUpText = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  color: #7b7b7b;
  font-family: "Inter", sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
`;
