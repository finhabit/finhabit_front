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

export const N_Section = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

export const ContentBox = styled.div`
  width: 321px;
  min-height: 114px;
  max-height: 213px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export const PerMission = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin: 2px;
`;

export const PerCheck = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 280px;
  margin: 5px;
`;

export const Checked = styled.img`
  width: 14px;
  height: 14px;
`;

export const ProgressItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 8px 0;
  width: 100%;
`;

export const ProgressTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 5px;
`;

export const ProgressBar = styled.div`
  width: 270px;
  height: 13px;
  background: #d9d9d9;
  border-radius: 10px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $percent: number }>`
  width: ${({ $percent }) => $percent}%;
  height: 100%;
  background-color: #bec372;
  border-radius: 10px;
  transition: width 0.3s ease;
`;

export const ProgressPercent = styled.div`
  align-self: flex-end;
  font-size: 10px;
  font-weight: 600;
  margin-top: -15px;
  padding-right: 10px;
  color: #444;
`;
