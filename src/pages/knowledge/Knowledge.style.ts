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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const ContentBox = styled.div`
  width: 321px;
  min-height: 193px;
  max-height: 263px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 23px;
  background: #dfe67880;
  padding: 36px 8px;
  margin: 10px 0;
  box-shadow: 0 3px 8px rgba(150, 150, 150, 0.25);
`;

export const ContentBox1 = styled.div`
  width: 321px;
  min-height: 253px;
  max-height: 293px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
  border-radius: 23px;
  border: 2px solid #dfe678;
  padding: 16px 8px;
  margin: 10px 0;
  box-shadow: 0 3px 8px rgba(150, 150, 150, 0.25);
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const RemindingSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 35px;
`;

export const PerK = styled.div`
  font-size: 15px;
  margin: 10px;
`;

export const KTitle = styled.div`
  margin: 5px 0;
  color: #848d00;
`;

export const GathTitle = styled.div`
  color: #848d00;
  margin: 5px;
  display: flex;
  justify-content: center;
`;

export const GathContent = styled.div`
  width: 200px;
  text-align: center;
`;

export const PerGath = styled.div`
  margin: 10px;
`;

export const TabWrapper = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  background: ${(props) => (props.$active ? '#dfe678' : 'transparent')};
  border: none;
  padding: 3px 13px;
  border-radius: 16px;
  font-weight: 500;
  cursor: pointer;
  color: ${(props) => (props.$active ? 'black' : '#666')};
  transition: 0.2s;
`;

export const TabHugger = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 20px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
`;
