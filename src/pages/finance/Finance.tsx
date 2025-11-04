import { useMemo } from "react";
import BottomNav from "../../components/BottomNav";

// 아이콘
import bellIcon from "../../assets/bell.svg";
import searchIcon from "../../assets/search.svg";
import bulbIcon from "../../assets/bulb.svg";
import quizIcon from "../../assets/quiz.svg";
import calendarIcon from "../../assets/calendar.svg";
import plusIcon from "../../assets/plus.svg";

import {
    Screen, SafeArea, Header, HeaderSpacer, HeaderIcons, IconBtn, TopIcon,
    Section, TitleRow, Left, Right, TinyIcon, TinyPlus, TitleText,
    CardKnowledge, CardQuiz, CardArchive, CardBody, CardTitle,
    Gap, BottomSpacer
} from "./Finance.style";

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
                            <CardTitle>선불과 후불의 차이,<br />
                                내 소비 습관엔 어떤 카드가 맞을까?</CardTitle>
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
                            <CardTitle>연 3% 단리로 1,000,000원을 <br />2년 맡기면 이자는?</CardTitle>
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
                        </CardBody>
                    </CardArchive>
                </Section>

                <BottomSpacer />
            </SafeArea>

            <BottomNav />
        </Screen>
    );
}

