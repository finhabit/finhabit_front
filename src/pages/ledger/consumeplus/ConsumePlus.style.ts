import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px;
`;

export const DateText = styled.div`
  color: #333;
  font-size: 32px;
  font-weight: 500;
`;

export const CloseBtn = styled.img`
  width: 18px;
  cursor: pointer;
`;

export const AmountBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px;
  font-size: 40px;
  font-weight: 400;
`;

export const Won = styled.span`
  font-size: 40px;
  color: #666;
  margin-right: 5px;
`;

export const Input = styled.input`
  width: 250px;
  border: none;
  outline: none;
  text-align: right;
  font-size: 60px;
  font-weight: 540;
  color: #616161;
`;

export const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

interface TypeButtonProps {
  $active?: boolean;
  color: string;
}

export const TypeButton = styled.button<TypeButtonProps>`
  width: 144px;
  height: 61px;
  border-radius: 8px;
  background: ${({ $active, color }) => ($active ? color + '33' : '#DFE67880')};
  border: none;
  font-size: 24px;
  font-weight: 500;
  color: ${({ color }) => color};
  cursor: pointer;
  transition: 0.2s;
`;

export const WonImg = styled.img`
  width: 55px;
`;
