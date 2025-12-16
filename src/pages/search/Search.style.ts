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

export const ResultList = styled.ul`
  width: 100%;
  margin-top: 20px;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ResultItem = styled.li`
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 5px;

  &:hover {
    background-color: #fafafa;
  }
`;

export const ResultTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

export const ResultPath = styled.div`
  font-size: 12px;
  color: #999;
`;

export const NoResult = styled.div`
  margin-top: 50px;
  color: #c5c5c5;
  font-size: 14px;
  text-align: center;
`;
