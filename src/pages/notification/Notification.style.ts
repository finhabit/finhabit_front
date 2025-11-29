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

export const Icons = styled.img`
  position: absolute;
  left: 0;
  height: 20px;
  cursor: pointer;
`;

export const ToggleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 35px;
  font-size: 18px;
  font-weight: 500;
`;

export const ToggleWrapper = styled.div<{ $isOn: boolean }>`
  width: 45px;
  height: 24px;
  border-radius: 30px;
  background-color: ${({ $isOn }) => ($isOn ? '#D4DE47' : '#ccc')};
  display: flex;
  align-items: center;
  padding: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
`;

export const ToggleCircle = styled.div<{ $isOn: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  transform: ${({ $isOn }) => ($isOn ? 'translateX(23px)' : 'translateX(2px)')};
  transition: all 0.3s ease;
`;

export const N_Section = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
`;

export const ContentBox = styled.div`
  width: 321px;
  min-height: 114px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  border-radius: 23px;
  background: #dfe67880;
  padding: 10px;
  margin: 10px 0;
  box-shadow: 0 3px 8px rgba(150, 150, 150, 0.25);
`;

export const RemindingSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 35px;
`;
