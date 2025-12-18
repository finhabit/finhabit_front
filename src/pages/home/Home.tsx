import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '@/components/BottomNav';
import Donuts from '@/components/Donuts';

// API 연동 (작성하신 api 함수명 반영)
import { getLedgerHome } from '@/api/ledger.api';
import { getTodayMission, checkMission, uncheckMission } from '@/api/mission.api';
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

  // 데이터 로드 함수
  const fetchHomeData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [ledgerRes, missionRes, knowledgeRes] = await Promise.all([
        getLedgerHome(),
        getTodayMission(),
        getTodayKnowledge()
      ]);

      // 소비 요약 데이터 설정
      if (ledgerRes?.todayCategories) {
        setChartData(ledgerRes.todayCategories.map((cat, index) => ({
          id: cat.categoryId,
          label: cat.categoryName,
          ratio: cat.percent,
          color: CHART_COLORS[index % CHART_COLORS.length],
        })));
      }

      // 오늘의 미션 설정
      setTodayMission(missionRes?.todayMission || null);

      // 오늘의 지식 설정
      if (knowledgeRes) {
        setKnowledge({
          id: (knowledgeRes as Knowledge).financeId,
          content: (knowledgeRes as Knowledge).cardContent
        });
      }
    } catch (error: any) {
      const status = error.response?.status;
      if (status === 500) {
        alert("서버 점검 중입니다. 잠시 후 다시 시도해주세요.");
      } else if (status === 401) {
        // 로그인되지 않은 사용자 처리
        alert("로그인이 필요합니다.");
        navigate('/login');
      }
      console.error('데이터 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  // 미션 체크/취소 토글 핸들러
  const handleMissionToggle = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 전체 클릭 이동 이벤트 방지
    if (!todayMission) return;

    try {
      const { userMissionId, completed } = todayMission;

      if (completed) {
        // 이미 체크된 상태라면 취소 수행
        await uncheckMission(userMissionId);
      } else {
        // 미완료 상태라면 체크 수행
        await checkMission(userMissionId);
      }

      // 처리 후 최신 데이터 재조회
      await fetchHomeData();
    } catch (error: any) {
      const status = error.response?.status;
      const errorMessage = error.response?.data?.message;

      // 명세서 기반 에러 메시지 분기 처리
      if (status === 409) {
        alert("동시에 여러 요청이 발생했습니다. 다시 시도해주세요.");
      } else if (status === 403) {
        alert("다른 사용자의 미션은 변경할 수 없습니다.");
      } else if (status === 404) {
        alert("해당 미션을 찾을 수 없습니다.");
      } else {
        alert(errorMessage || "요청 중 오류가 발생했습니다.");
      }
    }
  };

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

          <S.MissionCard onClick={() => navigate('/mission')}>
            <S.DecorLeft src={decoLeft} />
            <S.DecorRight src={decoRight} />
            <S.MissionContentWrapper>
              <S.MissionText>
                {todayMission ? todayMission.missionContent : "배정된 미션이 없습니다."}
              </S.MissionText>
              {todayMission && (
                <S.MissionCheck
                  src={todayMission.completed ? checkedIcon : checkBeforeIcon}
                  alt={todayMission.completed ? "완료" : "미완료"}
                  onClick={handleMissionToggle}
                />
              )}
            </S.MissionContentWrapper>
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