import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '@/components/BottomNav';
import Donuts from '@/components/Donuts';

import { getLedgerHome } from '@/api/ledger.api';
import type { LedgerHomeResponse } from '@/types/ledger';

import bellIcon from '@/assets/bell.svg';
import searchIcon from '@/assets/search.svg';
import bulbIcon from '@/assets/bulb.svg';
import plusIcon from '@/assets/plus.svg';
import missionIcon from '@/assets/mission.svg';
import chartIcon from '@/assets/chart.svg';
import decoLeft from '@/assets/deco-left.svg';
import decoRight from '@/assets/deco-right.svg';

import * as S from './Home.style';

const CHART_COLORS = [
  '#b6be40ff',
  '#626b00ff',
  '#cbd638ff',
  '#3e4300ff',
  '#FFADAD',
  '#FFD6A5',
  '#FDFFB6',
  '#CAFFBF',
  '#9BF6FF',
];

interface ChartData {
  id: number;
  label: string;
  ratio: number;
  color: string;
}

export default function Home() {
  const gaps = useMemo(() => ({ afterFirst: 33, afterSecond: 27 }), []);
  const navigate = useNavigate();

  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHomeData = async () => {
      setIsLoading(true);
      try {
        const today = new Date().toISOString().split('T')[0];

        const response: LedgerHomeResponse = await getLedgerHome(today);

        if (response.todayCategories && response.todayCategories.length > 0) {
          const formattedData = response.todayCategories.map((cat, index) => ({
            id: cat.categoryId,
            label: cat.categoryName,
            ratio: cat.percent,
            color: CHART_COLORS[index % CHART_COLORS.length],
          }));
          setChartData(formattedData);
        } else {
          setChartData([]);
        }
      } catch (error) {
        console.error('홈 데이터 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <S.Screen>
      <S.SafeArea>
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
              <S.TitleText>오늘의 소비 요약</S.TitleText>
            </S.Left>
            <S.Right>
              <S.TinyPlus src={plusIcon} alt="추가" onClick={() => navigate('/ledger')} />
            </S.Right>
          </S.TitleRow>

          <S.SummaryCard>
            {isLoading ? (
              <div style={{ color: '#aaa', margin: 'auto' }}>로딩 중...</div>
            ) : chartData.length > 0 ? (
              <Donuts categories={chartData} size={170} />
            ) : (
              <div style={{ color: '#aaa', margin: 'auto', textAlign: 'center', fontSize: '14px' }}>
                오늘의 소비 내역이 없습니다.
                <br />
                지출을 기록해보세요!
              </div>
            )}
          </S.SummaryCard>
        </S.Section>

        <S.BottomSpacer />
      </S.SafeArea>

      <BottomNav />
    </S.Screen>
  );
}
