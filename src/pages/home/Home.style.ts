import styled from 'styled-components';

export const SCREEN_MAX = 414;
export const CARD_MAX = 321;

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
  padding: 35px;
  box-sizing: border-box;
`;

export const Header = styled.header`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderSpacer = styled.div`
  width: 28px;
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
  width: 22px;
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
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  color: #000;
  font-size: 14px;
  font-weight: 600;
`;

/* ======= 오늘의 미션 카드 ======= */
export const MissionCard = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: ${CARD_MAX}px;
  height: 114px;
  border-radius: 23px;
  background: #dfe678;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

export const MissionContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 40px;
  z-index: 1;
`;

export const MissionText = styled.div`
  color: #2b2b27;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.2;
  word-break: keep-all;
`;

export const MissionCheck = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  transition: transform 0.1s ease;
  &:active {
    transform: scale(0.9);
  }
`;

export const DecorLeft = styled.img`
  position: absolute;
  top: 17px;
  left: 17px;
  width: 20px;
  height: 20px;
`;

export const DecorRight = styled.img`
  position: absolute;
  bottom: 17px;
  right: 17px;
  width: 20px;
  height: 20px;
`;

/* ======= 오늘의 지식 카드 ======= */
export const BaseCard = styled.div`
  width: 100%;
  max-width: ${CARD_MAX}px;
  border-radius: 23px;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  cursor: pointer;
  overflow: hidden;
`;

export const CardKnowledge = styled(BaseCard)`
  height: 114px;
  background: rgba(223, 230, 120, 0.5);
`;

export const CardBody = styled.div`
  height: 100%;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const CardTitle = styled.h3`
  margin: 0;
  color: #2b2b27;
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.4;
  width: 100%;
  white-space: pre-wrap;
  word-break: keep-all;
`;

/* ======= 간단 소비 요약 카드 ======= */
export const SummaryCard = styled.div`
  width: 100%;
  max-width: ${CARD_MAX}px;
  height: 260px;
  border-radius: 23px;
  border: 2px solid #dfe678;
  background: #fdfdfd;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 25px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Gap = styled.div``;

export const BottomSpacer = styled.div`
  height: 84px;
`;
