import { useMemo } from "react";
import styled from "styled-components";
import BottomNav from "../../components/BottomNav";

// 아이콘
import bellIcon from "../../assets/bell.svg";
import searchIcon from "../../assets/search.svg";
import bulbIcon from "../../assets/bulb.svg";
import quizIcon from "../../assets/quiz.svg";
import calendarIcon from "../../assets/calendar.svg";
import plusIcon from "../../assets/plus.svg";

export default function Finance() {
    // 카드 사이 간격: 1→2 = 33px, 2→3 = 27px 
    const gaps = useMemo(() => ({ afterFirst: 33, afterSecond: 27 }), []);

    return (
        <Screen>
            <SafeArea>
                {/* 상단 헤더 (오른쪽 아이콘 고정) */}
                <Header>
                    <HeaderSpacer />
                    <HeaderIcons>
                        <IconBtn aria-label="알림">
                            <TopIcon src={bellIcon} alt="bell" />
                        </IconBtn>
                        <IconBtn aria-label="검색">
                            <TopIcon src={searchIcon} alt="search" />
                        </IconBtn>
                    </HeaderIcons>
                </Header>

                {/* 오늘의 지식 */}
                <Section>
                    <TitleRow>
                        <Left>
                            <TinyIcon src={bulbIcon} alt="지식" />
                            <TitleText>오늘의 지식</TitleText>
                        </Left>
                        <Right>
                            <TinyPlus src={plusIcon} alt="추가" />
                        </Right>
                    </TitleRow>

                    <CardKnowledge>
                        <CardBody>
                            <CardTitle>금융 한 줄 지식</CardTitle>
                            <CardDesc>오늘은 복리와 단리의 차이를 알아봐요.</CardDesc>
                        </CardBody>
                    </CardKnowledge>

                    <Gap style={{ height: gaps.afterFirst }} />
                </Section>

                {/* 오늘의 퀴즈 */}
                <Section>
                    <TitleRow>
                        <Left>
                            <TinyIcon src={quizIcon} alt="퀴즈" />
                            <TitleText>오늘의 퀴즈</TitleText>
                        </Left>
                        <Right>
                            <TinyPlus src={plusIcon} alt="추가" />
                        </Right>
                    </TitleRow>

                    <CardQuiz>
                        <CardBody>
                            <CardTitle>퀴즈: 예금 이자 계산</CardTitle>
                            <CardDesc>연 3% 단리로 1,000,000원을 2년 맡기면 이자는?</CardDesc>
                        </CardBody>
                    </CardQuiz>

                    <Gap style={{ height: gaps.afterSecond }} />
                </Section>

                {/* 주간 월간 모아보기 */}
                <Section>
                    <TitleRow>
                        <Left>
                            <TinyIcon src={calendarIcon} alt="모아보기" />
                            <TitleText>주간 월간 모아보기</TitleText>
                        </Left>
                        <Right>
                            <TinyPlus src={plusIcon} alt="추가" />
                        </Right>
                    </TitleRow>

                    <CardArchive>
                        <CardBody>
                            <CardTitle>이번 주 학습 요약</CardTitle>
                            <div>
                                그래프
                            </div>
                        </CardBody>
                    </CardArchive>
                </Section>

                <BottomSpacer />
            </SafeArea>

            <BottomNav />
        </Screen>
    );
}

/* ===================== styled ===================== */

const SCREEN_MAX = 414;
const CARD_MAX = 321;

const Screen = styled.div`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
`;

const SafeArea = styled.main`
  width: 100%;
  max-width: ${SCREEN_MAX}px;  
  padding:35px;
  box-sizing: border-box;
`;

const Header = styled.header`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderSpacer = styled.div`
  width: 28px;  
`;

const HeaderIcons = styled.div`
  display: flex;
  gap: 12px;
`;

const IconBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const TopIcon = styled.img`
  width: 22px;
  height: 22px;
`;

/* 섹션(제목줄 + 카드)만 중앙 정렬 */
const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;      
  width: 100%;
`;

/* 제목줄은 카드 폭과 동일하게 가운데 */
const TitleRow = styled.div`
  position: relative;               
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: ${CARD_MAX}px;           
  margin-bottom: 10px;                
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Right = styled.div``;

const TinyIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const TinyPlus = styled.img`
  width: 12px;
  height: 12px;
`;

const TitleText = styled.span`
  position: absolute;          
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;          
  color: #000;
  font-family: Pretendard, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
    "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

/* 카드 베이스: 중앙 + 공통 그림자 */
const BaseCard = styled.div`
  width: 100%;
  max-width: ${CARD_MAX}px;
  border-radius: 23px;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.1);
  margin: 0 auto;
`;

/* 각 카드 스타일 */
const CardKnowledge = styled(BaseCard)`
  height: 114px;
  background: #dfe678;
`;

const CardQuiz = styled(BaseCard)`
  height: 114px;
  background: rgba(223, 230, 120, 0.5);
`;

const CardArchive = styled(BaseCard)`
  height: 260px;
  background: #fdfdfd;
  border: 2px solid #dfe678;
`;

/* 카드 내부 컨텐츠 레이아웃 */
const CardBody = styled.div`
  height: 100%;
  display: flex;
  padding-left:20px;
  flex-direction: column;
  gap: 8px;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #2a2a2a;
`;

const CardDesc = styled.p`
  margin: 0;
  font-size: 13px;
  color: #4a4a4a;
`;



const Gap = styled.div``;

/* 하단 고정 네비 공간 확보 */
const BottomSpacer = styled.div`
  height: 84px; /* 하단 고정 네비(64px) + 여유 */
`;
