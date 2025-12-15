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
  margin: 0 35px 20px 35px;
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

export const RemindingSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 35px;
  gap: 20px;
`;

export const N_Section = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 500;
`;

export const ContentBox = styled.div`
  width: 100%;
  min-height: 114px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 23px;
  background: #dfe67880;
  padding: 20px;
  margin-top: 10px;
  box-shadow: 0 3px 8px rgba(150, 150, 150, 0.25);
  box-sizing: border-box;
`;

export const NotiTitle = styled.div`
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #333;
`;

export const NotiMessage = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #555;
  line-height: 1.4;
  white-space: pre-wrap;
`;

export const EmptyText = styled.div`
  font-size: 14px;
  color: #999;
  font-weight: 500;
`;
