import styled from "styled-components";

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

/* 섹션(제목줄 + 카드)만 중앙 정렬 */
export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;      
  width: 100%;
`;

/* 제목줄은 카드 폭과 동일하게 가운데 */
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
`;

export const TitleText = styled.span`
  position: absolute;          
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;          
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

/* 카드 베이스: 중앙 + 공통 그림자 */
export const BaseCard = styled.div`
  width: 100%;
  max-width: ${CARD_MAX}px;
  border-radius: 23px;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.1);
  margin: 0 auto;
`;

/* 각 카드 스타일 */
export const CardKnowledge = styled(BaseCard)`
  height: 114px;
  background: #dfe678;
`;

export const CardQuiz = styled(BaseCard)`
  height: 114px;
  background: rgba(223, 230, 120, 0.5);
`;

export const CardArchive = styled(BaseCard)`
  height: 260px;
  background: #fdfdfd;
  border: 2px solid #dfe678;
`;

/* 카드 내부 컨텐츠 레이아웃 */
export const CardBody = styled.div`
  height: 100%;
  display: flex;
  padding: 16px 18px;
  flex-direction: column;
  gap: 8px;
`;

export const CardTitle = styled.h3`
  color: #2B2B27;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.2;
  width: 100%;
  max-width: 277px;  
  white-space: nowrap;
`;



export const Gap = styled.div``;

/* 하단 고정 네비 공간 확보 */
export const BottomSpacer = styled.div`
  height: 84px; /* 하단 고정 네비(64px) + 여유 */
`;
