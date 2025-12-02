import styled from 'styled-components';

export const UpLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 40px 35px 20px 35px;
  font-size: 22px;
  font-weight: 500;
`;

export const Icon = styled.img`
  position: absolute;
  left: 0;
  height: 20px;
  cursor: pointer;
`;

export const RightIcon = styled.img`
  position: absolute;
  right: 0;
  height: 20px;
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 40px;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 42px;
  border-radius: 25px;
  border: 1.5px solid #e5e5e5;
  padding: 0 18px;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: #c5c5c5;
  }
`;

export const KeywordWrap = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 15px;
`;

export const Keyword = styled.div`
  font-size: 13px;
  color: #b0b0b0;
  cursor: pointer;
`;
