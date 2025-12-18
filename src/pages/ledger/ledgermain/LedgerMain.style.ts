import styled from 'styled-components';

export const UpLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px 45px 20px 35px;
  font-size: 22px;
  font-weight: 500;
`;

export const Icons = styled.img`
  height: 20px;
  cursor: pointer;
`;

export const L_Section = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
`;

export const ContentBox = styled.div`
  width: 88%;
  min-height: 84px;
  max-height: 213px;
  overflow: hidden;
  border-radius: 23px;
  background: #dfe67880;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 0 3px 8px rgba(150, 150, 150, 0.25);
`;

export const ContentBox_1 = styled.div`
  width: 88%;
  min-height: 84px;
  max-height: 240px;
  overflow: hidden;
  border-radius: 23px;
  background: #dfe678;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 0 3px 8px rgba(150, 150, 150, 0.25);
`;

export const ConsumeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const L_Header = styled.div`
  width: 321px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
  font-size: 14px;
`;

export const MiniIcons = styled.img`
  width: 25px;
`;

export const PlusIcons = styled.img`
  height: 12px;
  cursor: pointer;
`;

export const Perrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  margin: 5px 0;
`;

export const CategoryIcon = styled.img`
  width: 35px;
`;

export const SummaryCard = styled.div`
  width: 100%;
  max-width: 321px;
  height: 260px;
  border-radius: 23px;
  border: 2px solid #dfe678;
  background: #fdfdfd;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.1);

  /* Donuts가 그래프만 렌더 */
  padding: 25px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

export const Gap = styled.div``;

export const BottomSpacer = styled.div`
  height: 84px;
`;

export const TitleText = styled.span`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  color: #000;
  font-size: 14px;
  font-weight: 600;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
`;

export const TitleRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 321px;
  margin-bottom: 10px;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Right = styled.div``;
