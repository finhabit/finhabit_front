import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
import Donuts from "../../components/Donuts";

// 아이콘
import bellIcon from "../../assets/bell.svg";
import searchIcon from "../../assets/search.svg";
import bulbIcon from "../../assets/bulb.svg";
import plusIcon from "../../assets/plus.svg";
import missionIcon from "../../assets/mission.svg";
import chartIcon from "../../assets/chart.svg";
import decoLeft from "../../assets/deco-left.svg";
import decoRight from "../../assets/deco-right.svg";

// 스타일 import
import {
  Screen, SafeArea, Header, HeaderSpacer, HeaderIcons, IconBtn, TopIcon,
  Section, TitleRow, Left, Right, TinyIcon, TinyPlus, TitleText,
  MissionCard, DecorLeft, DecorRight, MissionText,
  KnowledgeCard, CardBody, CardTitle, SummaryCard,
  Gap, BottomSpacer
} from "./Home.style";


export default function Home() {
  const gaps = useMemo(() => ({ afterFirst: 33, afterSecond: 27 }), []);
  const navigate = useNavigate();

  return (
    <Screen>
      <SafeArea>
        {/* 상단 헤더 */}
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
            <IconBtn aria-label="검색">
              <TopIcon src={searchIcon} alt="search" />
            </IconBtn>
          </HeaderIcons>
        </Header>

        {/* 오늘의 미션 */}
        <Section>
          <TitleRow>
            <Left>
              <TinyIcon src={missionIcon} alt="미션" />
              <TitleText>오늘의 미션</TitleText>
            </Left>
            <Right>
              <TinyPlus src={plusIcon} alt="추가" />
            </Right>
          </TitleRow>

          <MissionCard>
            <DecorLeft src={decoLeft || missionIcon} alt="장식 아이콘 왼쪽" />
            <DecorRight
              src={decoRight || missionIcon}
              alt="장식 아이콘 오른쪽"
            />
            <MissionText>커피값 2000원 이상 사용하지 않기</MissionText>
          </MissionCard>

          <Gap style={{ height: gaps.afterFirst }} />
        </Section>

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

          <KnowledgeCard>
            <CardBody>
              <CardTitle>선불과 후불의 차이,<br />
                내 소비 습관엔 어떤 카드가 맞을까?</CardTitle>
            </CardBody>
          </KnowledgeCard>

          <Gap style={{ height: gaps.afterSecond }} />
        </Section>

        {/* 간단 소비 요약 */}
        <Section>
          <TitleRow>
            <Left>
              <TinyIcon src={chartIcon} alt="소비 요약" />
              <TitleText>간단 소비 요약</TitleText>
            </Left>
            <Right>
              <TinyPlus src={plusIcon} alt="추가" />
            </Right>
          </TitleRow>
          <SummaryCard>
            <Donuts />
          </SummaryCard>
        </Section>

        <BottomSpacer />
      </SafeArea>

      <BottomNav />
    </Screen>
  );
}