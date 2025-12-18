import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '@/components/BottomNav';
import Donuts from '@/components/Donuts';

// API 연동
import { getLedgerHome } from '@/api/ledger.api';
import { getTodayMission } from '@/api/mission.api';
import { getTodayKnowledge } from '@/api/knowledge.api';

// 타입 정의
import type { Mission as MissionType } from '@/types/mission';
import type { Knowledge } from '@/api/knowledge.api';

// 에셋
import bellIcon from '@/assets/bell.svg';
import searchIcon from '@/assets/search.svg';
import bulbIcon from '@/assets/bulb.svg';
import plusIcon from '@/assets/plus.svg';
import missionIcon from '@/assets/mission.svg';
import chartIcon from '@/assets/chart.svg';
import decoLeft from '@/assets/deco-left.svg';
import decoRight from '@/assets/deco-right.svg';
import checkBeforeIcon from '@/assets/check-before.svg';
import checkedIcon from '@/assets/checked_b.svg';

import * as S from './Home.style';

const CHART_COLORS = [
  '#b6be40ff', '#626b00ff', '#cbd638ff', '#3e4300ff',
  '#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF',
];

export default function Home() {
  const gaps = useMemo(() => ({ afterFirst: 33 }), []);
  const navigate = useNavigate();

  const [chartData, setChartData] = useState<any[]>([]);
  const [todayMission, setTodayMission] = useState<MissionType | null>(null);
  const [knowledge, setKnowledge] = useState<{ id: number; content: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHomeData = async () => {
      setIsLoading(true);
      try {
        const [ledgerRes, missionRes, knowledgeRes] = await Promise.all([
          getLedgerHome(),
          getTodayMission(),
          getTodayKnowledge()
        ]);

        // 1. 소비 요약 연동
        if (ledgerRes && ledgerRes.todayCategories) {
          const formattedData = ledgerRes.todayCategories.map((cat, index) => ({
            id: cat.categoryId,
            label: cat.categoryName,
            ratio: cat.percent,
            color: CHART_COLORS[index % CHART_COLORS.length],
          }));
          setChartData(formattedData);
        }

        // 2. 오늘의 미션 연동
        if (missionRes && missionRes.todayMission) {
          setTodayMission(missionRes.todayMission);
        }

        // 3. 오늘의 지식 연동 (Knowledge 타입에 맞춰 financeId, cardContent 접근)
        if (knowledgeRes) {
          setKnowledge({
            id: (knowledgeRes as Knowledge).financeId,
            content: (knowledgeRes as Knowledge).cardContent
          });
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
            <S.IconBtn onClick={() => navigate('/notification')}><S.TopIcon src={bellIcon} /></S.IconBtn>
            <S.IconBtn onClick={() => navigate('/search')}><S.TopIcon src={searchIcon} /></S.IconBtn>
          </S.HeaderIcons>
        </S.Header>

        {/* 오늘의 미션 섹션 */}
        <S.Section>
          <S.TitleRow>
            <S.Left>
              <S.TinyIcon src={missionIcon} alt="미션" />
              <S.TitleText>오늘의 미션</S.TitleText>
            </S.Left>
            <S.Right>
              <S.TinyPlus src={plusIcon} onClick={() => navigate('/mission')} />
            </S.Right>
          </S.TitleRow>

          <S.MissionCard>
            <S.DecorLeft src={decoLeft} />
            <S.DecorRight src={decoRight} />

            <S.MissionContentWrapper>
              <S.MissionText>
                {todayMission ? todayMission.missionContent : "배정된 미션이 없습니다."}
              </S.MissionText>

              {/* 미션 완료 여부에 따라 아이콘 교체 */}
              {todayMission && (
                <S.MissionCheck
                  src={todayMission.progress >= 100 ? checkedIcon : checkBeforeIcon}
                  alt={todayMission.progress >= 100 ? "완료" : "미완료"}
                />
              )}
            </S.MissionContentWrapper>
          </S.MissionCard>

          <S.Gap style={{ height: gaps.afterFirst }} />
        </S.Section>

        {/* 오늘의 지식 섹션 */}
        <S.Section>
          <S.TitleRow>
            <S.Left>
              <S.TinyIcon src={bulbIcon} alt="지식" />
              <S.TitleText>오늘의 지식</S.TitleText>
            </S.Left>
            <S.Right>
              <S.TinyPlus src={plusIcon} onClick={() => navigate('/knowledge')} />
            </S.Right>
          </S.TitleRow>

          <S.CardKnowledge onClick={() => knowledge && navigate(`/knowledge/${knowledge.id}`)}>
            <S.CardBody>
              <S.CardTitle>
                {knowledge ? knowledge.content : "금융 지식을 불러오는 중입니다."}
              </S.CardTitle>
            </S.CardBody>
          </S.CardKnowledge>

          <S.Gap style={{ height: gaps.afterFirst }} />
        </S.Section>

        {/* 소비 요약 섹션 */}
        <S.Section>
          <S.TitleRow>
            <S.Left>
              <S.TinyIcon src={chartIcon} alt="소비 요약" />
              <S.TitleText>오늘의 소비 요약</S.TitleText>
            </S.Left>
            <S.Right>
              <S.TinyPlus src={plusIcon} onClick={() => navigate('/ledger')} />
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