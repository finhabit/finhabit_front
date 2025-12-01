import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import back from '@/assets/back.svg';
import checked from '@/assets/checked.svg';
import weekFilterIcon from '@/assets/weekfilter.svg';
import * as S from './Mission.style';

export default function Mission() {
  const navigate = useNavigate();

  const weekOptions = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    return Array.from({ length: 5 }, (_, i) => `${currentMonth}월 ${i + 1}주차`);
  }, []);

  const [currentWeek, setCurrentWeek] = useState(weekOptions[0]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const completedMissionsData = [
    { id: 1, text: '소비 내역 1건 직접 입력하기', week: weekOptions[0] },
    { id: 2, text: '배달앱 대신 직접 포장 주문하기', week: weekOptions[0] },
    { id: 3, text: '일주일에 무지출 챌린지 1회', week: weekOptions[1] },
  ];

  const handleWeekSelect = (week: string) => {
    setCurrentWeek(week);
    setIsFilterOpen(false);
  };

  const filteredMissions = completedMissionsData.filter((m) => m.week === currentWeek);

  return (
    <>
      <S.UpLine>
        <S.Icons src={back} alt="이전으로" onClick={() => navigate(-1)} />
        미션
      </S.UpLine>
      <S.RemindingSection>
        <S.N_Section>
          미션 모아보기
          <S.ContentBox>
            <S.PerMission>
              <div>이번 주 목표 저축금액 5천원 달성하기</div>
              <div>1/3 개</div>
            </S.PerMission>
            <S.PerMission>
              <div>이번 주 배운 금융 용어 3개 복습하기</div>
              <div>1/3 회</div>
            </S.PerMission>
          </S.ContentBox>
        </S.N_Section>

        <S.N_Section>
          미션 진행 상황
          <S.ContentBox>
            <S.ProgressItem>
              <S.ProgressTitle>이번 주 배운 금융 용어 3개 복습하기</S.ProgressTitle>
              <S.ProgressRow>
                <S.ProgressBar>
                  <S.ProgressFill $percent={30} />
                </S.ProgressBar>
                <S.ProgressPercent>30%</S.ProgressPercent>
              </S.ProgressRow>
            </S.ProgressItem>

            <S.ProgressItem>
              <S.ProgressTitle>이번 주 목표 저축금액 5천원 달성하기</S.ProgressTitle>
              <S.ProgressRow>
                <S.ProgressBar>
                  <S.ProgressFill $percent={20} />
                </S.ProgressBar>
                <S.ProgressPercent>20%</S.ProgressPercent>
              </S.ProgressRow>
            </S.ProgressItem>
          </S.ContentBox>
        </S.N_Section>

        <S.N_Section>
          <S.FilterHeader>
            완료한 미션들
            <S.FilterIcon src={weekFilterIcon} alt="필터" onClick={() => setIsFilterOpen(!isFilterOpen)} />
            {isFilterOpen && (
              <S.FilterModal>
                {weekOptions.map((week) => (
                  <S.ModalItem key={week} $isSelected={week === currentWeek} onClick={() => handleWeekSelect(week)}>
                    {week}
                  </S.ModalItem>
                ))}
              </S.FilterModal>
            )}
          </S.FilterHeader>

          <S.ContentBox>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '5px' }}>{currentWeek}</div>

            {filteredMissions.length > 0 ? (
              filteredMissions.map((mission) => (
                <S.PerCheck key={mission.id}>
                  <div>{mission.text}</div>
                  <S.Checked src={checked} alt="완료" />
                </S.PerCheck>
              ))
            ) : (
              <div style={{ padding: '20px', color: '#999', fontSize: '13px' }}>완료한 미션이 없습니다.</div>
            )}
          </S.ContentBox>
        </S.N_Section>
      </S.RemindingSection>
    </>
  );
}
