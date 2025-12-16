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
  text-align: left;
  position: relative;
  margin-bottom: 20px;
`;

export const ContentBox = styled.div`
  width: 321px;
  min-height: 114px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 23px;
  background: #dfe67880;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 0 3px 8px rgba(150, 150, 150, 0.25);
  box-sizing: border-box;
`;

// ✨ [추가] 스크롤이 가능한 박스 (완료한 미션용)
export const ScrollableContentBox = styled.div`
  width: 321px;
  min-height: 114px;
  max-height: 300px; /* 최대 높이 제한 (넘치면 스크롤) */

  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 내용이 위에서부터 쌓이도록 설정 */
  align-items: center;

  border-radius: 23px;
  background: #dfe67880;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 0 3px 8px rgba(150, 150, 150, 0.25);
  box-sizing: border-box;

  /* 세로 스크롤 활성화 */
  overflow-y: auto;

  /* 스크롤바 숨기기 (선택사항) */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const RemindingSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 35px;
  padding-bottom: 50px;
`;

export const PerMission = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 500;
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
`;

export const PerCheck = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 8px 0;
  font-size: 14px;
  font-weight: 500;
`;

export const Checked = styled.img`
  width: 16px;
  height: 16px;
`;

export const ProgressItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 12px 0;
  width: 100%;
`;

export const ProgressTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
  text-align: left;
  width: 100%;
`;

export const ProgressRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const ProgressBar = styled.div`
  flex: 1;
  height: 14px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin-right: 12px;
`;

export const ProgressFill = styled.div<{ $percent: number }>`
  width: ${({ $percent }) => $percent}%;
  height: 100%;
  background-color: #bec372;
  border-radius: 10px;
  transition: width 0.5s ease;
`;

export const ProgressPercent = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #444;
  white-space: nowrap;
`;

export const FilterHeader = styled.div`
  width: 321px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  position: relative;
  font-size: 14px;
  font-weight: 500;
`;

export const FilterIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const FilterModal = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  width: 120px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 10px 0;
  z-index: 100;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ModalItem = styled.div<{ $isSelected: boolean }>`
  padding: 10px 20px;
  font-size: 13px;
  color: ${({ $isSelected }) => ($isSelected ? '#333' : '#999')};
  font-weight: ${({ $isSelected }) => ($isSelected ? '700' : '400')};
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: #f5f5f5;
  }
`;
