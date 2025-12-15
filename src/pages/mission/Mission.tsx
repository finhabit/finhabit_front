import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import back from '@/assets/back.svg';
import checked from '@/assets/checked.svg';
import weekFilterIcon from '@/assets/weekfilter.svg';
import * as S from './Mission.style';

import { getTodayMission, getMissionArchive } from '@/api/mission.api';
import type { Mission as MissionType, MissionArchiveItem } from '@/types/mission';

export default function Mission() {
  const navigate = useNavigate();

  const [todayMission, setTodayMission] = useState<MissionType | null>(null);
  const [archiveData, setArchiveData] = useState<MissionArchiveItem[]>([]);

  const [currentWeekLabel, setCurrentWeekLabel] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const todayData = await getTodayMission();
      setTodayMission(todayData.todayMission);

      const archiveRes = await getMissionArchive();
      setArchiveData(archiveRes);

      if (archiveRes.length > 0) {
        setCurrentWeekLabel(formatWeekLabel(archiveRes[0]));
      } else {
        setCurrentWeekLabel(getFormattedWeek(new Date()));
      }
    } catch (error) {
      console.error('미션 데이터 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWeekSelect = (label: string) => {
    setCurrentWeekLabel(label);
    setIsFilterOpen(false);
  };

  const formatWeekLabel = (item: MissionArchiveItem) => {
    return getFormattedWeek(item.weekStart);
  };

  const filteredMissions = useMemo(() => {
    const target = archiveData.find((item) => formatWeekLabel(item) === currentWeekLabel);
    return target ? target.missions : [];
  }, [archiveData, currentWeekLabel]);

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <>
      <S.UpLine>
        <S.Icons src={back} alt="이전으로" onClick={() => navigate(-1)} />
        미션
      </S.UpLine>

      <S.RemindingSection>
        <S.N_Section>
          오늘의 미션
          <S.ContentBox>
            {todayMission ? (
              <S.PerMission>
                <div>{todayMission.missionContent}</div>
                <div>
                  {todayMission.doneCount}/{todayMission.totalCount} 회
                </div>
              </S.PerMission>
            ) : (
              <div style={{ color: '#999', padding: '10px' }}>오늘 배정된 미션이 없습니다.</div>
            )}
          </S.ContentBox>
        </S.N_Section>

        <S.N_Section>
          미션 진행 상황
          <S.ContentBox>
            {todayMission ? (
              <S.ProgressItem>
                <S.ProgressTitle>{todayMission.missionContent}</S.ProgressTitle>
                <S.ProgressRow>
                  <S.ProgressBar>
                    <S.ProgressFill $percent={todayMission.progress} />
                  </S.ProgressBar>
                  <S.ProgressPercent>{todayMission.progress}%</S.ProgressPercent>
                </S.ProgressRow>
              </S.ProgressItem>
            ) : (
              <div style={{ color: '#999', padding: '10px' }}>진행 중인 미션이 없습니다.</div>
            )}
          </S.ContentBox>
        </S.N_Section>

        <S.N_Section>
          <S.FilterHeader>
            완료한 미션들
            <S.FilterIcon src={weekFilterIcon} alt="필터" onClick={() => setIsFilterOpen(!isFilterOpen)} />
            {isFilterOpen && (
              <S.FilterModal>
                {archiveData.length > 0 ? (
                  archiveData.map((item) => {
                    const label = formatWeekLabel(item);
                    return (
                      <S.ModalItem
                        key={item.weekStart}
                        $isSelected={label === currentWeekLabel}
                        onClick={() => handleWeekSelect(label)}>
                        {label}
                      </S.ModalItem>
                    );
                  })
                ) : (
                  <S.ModalItem>기록 없음</S.ModalItem>
                )}
              </S.FilterModal>
            )}
          </S.FilterHeader>

          <S.ContentBox>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '5px' }}>
              {currentWeekLabel || '기간 선택'}
            </div>

            {filteredMissions.length > 0 ? (
              filteredMissions.map((mission) => (
                <S.PerCheck key={mission.userMissionId}>
                  <div>{mission.missionContent}</div>
                  <S.Checked src={checked} alt="완료" />
                </S.PerCheck>
              ))
            ) : (
              <div style={{ padding: '20px', color: '#999', fontSize: '13px' }}>
                해당 주차에 완료한 미션이 없습니다.
              </div>
            )}
          </S.ContentBox>
        </S.N_Section>
      </S.RemindingSection>
    </>
  );
}

// M월 n주차 변환 함수
function getFormattedWeek(dateInput: string | Date): string {
  let date: Date;

  if (typeof dateInput === 'string') {
    const [year, month, day] = dateInput.split('-').map(Number);
    date = new Date(year, month - 1, day);
  } else {
    date = dateInput;
  }

  const month = date.getMonth() + 1;
  const day = date.getDate();

  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const week = Math.ceil((day + firstDayOfMonth) / 7);

  return `${month}월 ${week}주차`;
}
