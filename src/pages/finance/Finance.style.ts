import styled from 'styled-components';

export const SCREEN_MAX = 414;
export const CARD_MAX = 321;
const HORIZONTAL_PADDING = 20;

export const Screen = styled.div`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
`;

export const SafeArea = styled.main`
  width: 100%;
  max-width: ${SCREEN_MAX}px;
  padding: 35px ${HORIZONTAL_PADDING}px;
  box-sizing: border-box;
`;

export const Header = styled.header`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderSpacer = styled.div`
  width: 29px;
`;

export const HeaderIcons = styled.div`
  display: flex;
  gap: 12px;
`;

export const IconBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const TopIcon = styled.img`
  width: 29px;
  height: 22px;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const TitleRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: ${CARD_MAX}px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const Right = styled.div``;

export const TinyIcon = styled.img`
  width: 32px;
  height: 32px;
`;

export const TinyPlus = styled.img`
  width: 12px;
  height: 12px;
  cursor: pointer;
`;

export const TitleText = styled.span`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
`;

export const BaseCard = styled.div`
  width: 100%;
  max-width: ${CARD_MAX}px;
  border-radius: 23px;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  cursor: pointer;
`;

export const CardKnowledge = styled(BaseCard)`
  height: 114px;
  background: #dfe678;
`;

export const CardQuiz = styled(BaseCard)`
  height: 114px;
  background: rgba(223, 230, 120, 0.5);
`;

export const CardArchive = styled(BaseCard)`
  background: #fdfdfd;
  border: 2px solid #dfe678;
  padding: 10px 0;
`;

export const CardBody = styled.div`
  height: 100%;
  flex-direction: column;
  gap: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardBody1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 18px;
`;

export const Card1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 0;
`;

export const CardTop = styled.h3`
  margin: 0;
  color: #848d00;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  white-space: pre-wrap;
`;

export const CardTitle = styled.h3`
  margin: 0;
  color: #2b2b27;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.2;
  width: 90%;
  white-space: pre-wrap;
`;

export const Q_CardTitle = styled.h3`
  margin: 0;
  color: #2b2b27;
  text-align: center;
  font-size: 13px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
`;

export const A_CardTitle = styled.h3`
  margin: 0;
  color: #2b2b27;
  text-align: center;
  font-size: 14px;
  line-height: 1.3;
  width: 100%;
  white-space: pre-wrap;
`;

export const Gap = styled.div``;

export const BottomSpacer = styled.div`
  height: 84px;
`;
