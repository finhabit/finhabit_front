import { useMemo } from "react";
import styled from "styled-components";
import BottomNav from "../../components/BottomNav";

// 아이콘(이미지는 교체해서 사용하세요)
import bellIcon from "../../assets/bell.png";
import searchIcon from "../../assets/search.png";
import bulbIcon from "../../assets/bulb.png";
import quizIcon from "../../assets/quiz.png";
import calendarIcon from "../../assets/calendar.png";
import plusIcon from "../../assets/plus.png";

export default function Financ() {
    // 카드 사이 간격: 1→2 = 71px, 2→3 = 63px
    const gaps = useMemo(() => ({ afterFirst: 71, afterSecond: 63 }), []);

    return (
        <Screen>
            <SafeArea>
                <Header>
                    <HeaderSpacer />{/* 왼쪽 정렬 맞추기용 */}
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

                    <CardKnowledge />{/* height 114, bg #DFE678 */}
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

                    <CardQuiz />{/* height 114, bg rgba(223,230,120,0.5) */}
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

                    <CardArchive />{/* height 260, border #DFE678 */}
                </Section>
            </SafeArea>

            <BottomPadding />{/* 고정 하단바 공간 확보 */}
            <BottomNav />
        </Screen>
    );
}

/* ===================== styled ===================== */

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
  max-width: 414px; /* 하단 네비와 동일한 기준 너비 */
  padding: 12px 16px 0;
  box-sizing: border-box;
`;

const Header = styled.header`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderSpacer = styled.div`
  width: 28px; /* 왼쪽 아이콘 없을 때 균형 맞춤 */
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

const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px; /* 타이틀과 카드 사이 간격(이미지 기준으로 타이트) */
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Right = styled.div``;

const TinyIcon = styled.img`
  width: 18px;
  height: 18px;
`;

const TinyPlus = styled.img`
  width: 14px;
  height: 14px;
`;

const TitleText = styled.span`
  color: #000;
  font-family: Pretendard, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
    "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const BaseCard = styled.div`
  width: 100%;
  border-radius: 23px;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.1);
`;

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

const Gap = styled.div``;

const BottomPadding = styled.div`
  height: 84px; /* 하단 고정 네비(64px) + 여유 20px */
`;
