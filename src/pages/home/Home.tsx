import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '@/components/BottomNav';
import Donuts from '@/components/Donuts';

// 아이콘
import bellIcon from '@/assets/bell.svg';
import searchIcon from '@/assets/search.svg';
import bulbIcon from '@/assets/bulb.svg';
import plusIcon from '@/assets/plus.svg';
import missionIcon from '@/assets/mission.svg';
import chartIcon from '@/assets/chart.svg';
import decoLeft from '@/assets/deco-left.svg';
import decoRight from '@/assets/deco-right.svg';

// 스타일 import
import * as S from './Home.style';

export default function Home() {
  const gaps = useMemo(() => ({ afterFirst: 33, afterSecond: 27 }), []);
  const navigate = useNavigate();
  // 다중 카테고리 테스트 데이터, 이후 연동시 다른값으로 바꿔 사용
  const MultiCategoryData = [
    { id: 1, label: '식비', ratio: 45, color: '#b6be40ff' }, // 45%
    { id: 2, label: '교통', ratio: 20, color: '#626b00ff' }, // 20%
    { id: 3, label: '문화', ratio: 15, color: '#cbd638ff' }, // 15%
    { id: 4, label: '저축', ratio: 20, color: '#3e4300ff' }, // 20%
  ];

  return (
    <S.Screen>
      <S.SafeArea>
        {/* 상단 헤더 */}
        <S.Header>
          <S.HeaderSpacer />
          <S.HeaderIcons>
            <S.IconBtn aria-label="알림">
              <S.TopIcon src={bellIcon} alt="bell" onClick={() => navigate('/notification')} />
            </S.IconBtn>
            <S.IconBtn aria-label="검색">
              <S.TopIcon src={searchIcon} alt="search" onClick={() => navigate('/search')} />
            </S.IconBtn>
          </S.HeaderIcons>
        </S.Header>

        {/* 오늘의 미션 */}
        <S.Section>
          <S.TitleRow>
            <S.Left>
              <S.TinyIcon src={missionIcon} alt="미션" />
              <S.TitleText>오늘의 미션</S.TitleText>
            </S.Left>
            <S.Right>
              <S.TinyPlus src={plusIcon} alt="추가" onClick={() => navigate('/mission')} />
            </S.Right>
          </S.TitleRow>

          <S.MissionCard>
            <S.DecorLeft src={decoLeft || missionIcon} alt="장식 아이콘 왼쪽" />
            <S.DecorRight src={decoRight || missionIcon} alt="장식 아이콘 오른쪽" />
            <S.MissionText>커피값 2000원 이상 사용하지 않기</S.MissionText>
          </S.MissionCard>

          <S.Gap style={{ height: gaps.afterFirst }} />
        </S.Section>

        {/* 오늘의 지식 */}
        <S.Section>
          <S.TitleRow>
            <S.Left>
              <S.TinyIcon src={bulbIcon} alt="지식" />
              <S.TitleText>오늘의 지식</S.TitleText>
            </S.Left>
            <S.Right>
              <S.TinyPlus src={plusIcon} alt="추가" onClick={() => navigate('/knowledge')} />
            </S.Right>
          </S.TitleRow>

          <S.KnowledgeCard>
            <S.CardBody>
              <S.CardTitle>
                신용점수는 ‘금융 신뢰도’입니다.
                <br />
                연체나 과도한 대출은 점수를 낮춥니다.
              </S.CardTitle>
            </S.CardBody>
          </S.KnowledgeCard>

          <S.Gap style={{ height: gaps.afterSecond }} />
        </S.Section>

        {/* 간단 소비 요약 */}
        <S.Section>
          <S.TitleRow>
            <S.Left>
              <S.TinyIcon src={chartIcon} alt="소비 요약" />
              <S.TitleText>간단 소비 요약</S.TitleText>
            </S.Left>
            <S.Right>
              <S.TinyPlus src={plusIcon} alt="추가" onClick={() => navigate('/ledger')} />
            </S.Right>
          </S.TitleRow>
          <S.SummaryCard>
            <Donuts categories={MultiCategoryData} size={170} />
          </S.SummaryCard>
        </S.Section>

        <S.BottomSpacer />
      </S.SafeArea>

      <BottomNav />
    </S.Screen>
  );
}
