import { useMemo } from "react";
import BottomNav from "../../components/BottomNav";
import { useNavigate } from "react-router-dom";

// 아이콘
import bellIcon from "../../assets/bell.svg";
import bulbIcon from "../../assets/bulb.svg";
import quizIcon from "../../assets/quiz.svg";
import calendarIcon from "../../assets/calendar.svg";
import plusIcon from "../../assets/plus.svg";

import {
  Screen, SafeArea, Header, HeaderSpacer, HeaderIcons, IconBtn, TopIcon,
  Section, TitleRow, Left, Right, TinyIcon, TinyPlus, TitleText,
  CardKnowledge, CardQuiz, CardArchive, CardBody, CardBody1, CardTop, Card1, CardTitle, Q_CardTitle, A_CardTitle,
  Gap, BottomSpacer
} from "./Finance.style";

export default function Finance() {
  // 카드 사이 간격: 1→2 = 33px, 2→3 = 27px 
  const gaps = useMemo(() => ({ afterFirst: 33, afterSecond: 27 }), []);
  const navigate = useNavigate();

  return (
    <Screen>
      <SafeArea>
        {/* 상단 헤더 (오른쪽 아이콘 고정) */}
        <Header>
          <HeaderSpacer />
          <HeaderIcons>
            <IconBtn aria-label="알림">
              <TopIcon
                src={bellIcon}
                alt="bell"
                onClick={() => navigate("/notification")}
              />
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
              <TinyPlus
                src={plusIcon}
                alt="추가"
                onClick={() => navigate("/knowledge")}
              />
            </Right>
          </TitleRow>

          <CardKnowledge>
            <CardBody>
              <CardTop>
                신용점수 관리의 중요성
              </CardTop>
              <CardTitle>
                신용점수는 ‘금융 신뢰도’입니다. <br />
                연체나 과도한 대출은 점수를 낮춥니다.
              </CardTitle>
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
              <TinyPlus
                src={plusIcon}
                alt="추가"
                onClick={() => navigate("/quiz")}
              />
            </Right>
          </TitleRow>

          <CardQuiz>
            <CardBody>
              <CardTop>
                Q. 신용점수를 올리려면 어떻게 해야 할까요?
              </CardTop>
              <Q_CardTitle>
                ① 연체하지 않기 ② 카드 많이 만들기 ③ 대출 자주 받기
              </Q_CardTitle>
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
              <TinyPlus
                src={plusIcon}
                alt="추가"
                onClick={() => navigate("/knowledge")}
              />
            </Right>
          </TitleRow>

          <CardArchive>
            <CardBody1>
              <Card1>
                <CardTop>
                  보험의 역할
                </CardTop>
                <A_CardTitle>보험은 사고나 질병 등 예상치 못한 <br />
                  위험에 대비하는 ‘보호장치’입니다.</A_CardTitle>
              </Card1>
              <Card1>
                <CardTop>
                  분산투자의 의미
                </CardTop>
                <A_CardTitle>
                  자산을 여러 종목에 나눠 투자해 <br />
                  위험을 줄이는 방법입니다.
                </A_CardTitle>
              </Card1>
            </CardBody1>
          </CardArchive>
        </Section>

        <BottomSpacer />
      </SafeArea>

      <BottomNav />
    </Screen>
  );
}

