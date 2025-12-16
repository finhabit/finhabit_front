import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { getLedgerCalendar, deleteLedger } from '@/api/ledger.api';
import type { LedgerHomeResponse, LedgerItem, CategoryStat } from '@/types/ledger';

import back from '@/assets/back.svg';
import setting from '@/assets/settingsicon.svg';
import stats from '@/assets/stats.svg';
import search from '@/assets/docsearch.svg';
import memo from '@/assets/memo.svg';
import filter from '@/assets/filter.svg';
import dumcat from '@/assets/categoryeat.svg';
import modifyIcon from '@/assets/modification.svg';
import deleteIcon from '@/assets/delete.svg';
import editBlue from '@/assets/editblue.svg';
import deleteRed from '@/assets/deletered.svg';

import Donuts from '@/components/Donuts';
import ComingSoon from '@/components/ComingSoon';
import * as S from './LedgerCalendar.style';

const weekDays: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

interface Expense extends LedgerItem {}

interface DonutCategory {
  id: number;
  label: string;
  ratio: number;
  color: string;
}

const CATEGORY_COLOR_MAP: Record<number, string> = {
  1: '#b6be40ff',
  2: '#626b00ff',
  3: '#cbd638ff',
  4: '#3e4300ff',
  5: '#999999',
};

type LedgerCalendarResponse = LedgerHomeResponse;

const LedgerCalendar: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>(new Date());
  const [selectedTab, setSelectedTab] = useState<string | null>('category');

  const [dailyExpenses, setDailyExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalOutcome, setTotalOutcome] = useState(0);
  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([]);

  const [mode, setMode] = useState<'default' | 'edit' | 'delete'>('default');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const currentYear = useMemo(() => date.getFullYear().toString(), [date]);
  const currentMonth = useMemo(() => (date.getMonth() + 1).toString().padStart(2, '0'), [date]);
  // const currentDateStr = useMemo(() => date.toISOString().split('T')[0], [date]); // 일별 조회 API를 사용하지 않으므로 제거

  const fetchCalendarData = async () => {
    setIsLoading(true);
    try {
      // API 호출 시 year와 month만 전달
      const responseData: LedgerCalendarResponse = await getLedgerCalendar(currentYear, currentMonth);

      // API 명세가 /ledger/calendar에서 totalIncome, totalExpense, categories, ledgers를 월별로 가져온다고 가정
      setTotalIncome(responseData.totalIncome || 0);
      setTotalOutcome(responseData.totalExpense || 0);

      // 여기서는 ledgers 필드에 전체 월별 내역이 들어온다고 가정
      setDailyExpenses((responseData.ledgers || []) as Expense[]);

      setCategoryStats(responseData.categories || []);
    } catch (error) {
      console.error('가계부 캘린더 데이터 로드 실패:', error);
      alert('데이터 로드에 실패했습니다. API 구조와 타입을 확인해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const donutChartData: DonutCategory[] = useMemo(() => {
    if (categoryStats.length === 0) return [];

    return categoryStats.map((stat) => ({
      id: stat.categoryId,
      label: stat.categoryName,
      ratio: stat.percent,
      color: CATEGORY_COLOR_MAP[stat.categoryId] || '#cccccc',
    }));
  }, [categoryStats]);

  useEffect(() => {
    // 월이 변경될 때만 API를 다시 호출
    fetchCalendarData();
  }, [currentYear, currentMonth]); // 의존성 배열 수정: currentYear, currentMonth만 사용

  const onDateChange = (value: Date | Date[]) => {
    if (value instanceof Date) {
      setDate(value);
      // 날짜를 변경하면 해당 날짜의 내역만 필터링하거나, 새 API를 호출하는 로직이 필요할 수 있지만
      // 현재는 월간 데이터만 가져오므로, 일별 필터링은 프론트엔드에서 처리
      setSelectedTab('category');
    }
  };

  // 선택된 날짜(date)의 내역만 필터링하는 로직 추가
  const filteredDailyExpenses = useMemo(() => {
    const selectedDateStr = date.toISOString().split('T')[0];
    return dailyExpenses.filter((item) => item.date === selectedDateStr);
  }, [dailyExpenses, date]);

  const handleTabClick = (tabName: string) => {
    setSelectedTab((prev) => (prev === tabName ? null : tabName));
    setMode('default');
    setSelectedIds([]);
  };

  const startEditMode = () => {
    setMode('edit');
    setSelectedIds([]);
  };

  const startDeleteMode = () => {
    setMode('delete');
    setSelectedIds([]);
  };

  const handleCancel = () => {
    setMode('default');
    setSelectedIds([]);
  };

  const toggleSelection = (id: number) => {
    if (mode === 'edit') {
      // 수정 모드는 하나만 선택 가능
      if (selectedIds.includes(id)) {
        setSelectedIds([]);
      } else {
        setSelectedIds([id]);
      }
    } else if (mode === 'delete') {
      // 삭제 모드는 여러 개 선택 가능
      if (selectedIds.includes(id)) {
        setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
      } else {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const isValidAction = mode === 'delete' ? selectedIds.length > 0 : mode === 'edit' ? selectedIds.length === 1 : false;

  const executeAction = async () => {
    if (!isValidAction) return;

    if (mode === 'delete') {
      if (confirm(`${selectedIds.length}개의 항목을 삭제하시겠습니까?`)) {
        try {
          // DELETE API 호출
          await Promise.all(selectedIds.map((id) => deleteLedger(id)));
          alert('성공적으로 삭제되었습니다.');

          // UI 업데이트 및 데이터 새로고침
          handleCancel();
          await fetchCalendarData(); // 삭제 후 전체 데이터 다시 로드
        } catch (error) {
          console.error('삭제 실패:', error);
          alert('삭제에 실패했습니다. 다시 시도해 주세요.');
        }
      }
    } else if (mode === 'edit') {
      const itemToEdit = dailyExpenses.find((item) => item.ledgerId === selectedIds[0]);
      if (itemToEdit) {
        // 수정 페이지로 이동. 필요하다면 데이터 전달
        navigate('/consumeplus', { state: { ledgerId: itemToEdit.ledgerId, data: itemToEdit } });
      }
    }
  };

  const closeOverlay = () => {
    setSelectedTab(null);
  };

  return (
    <>
      <S.UpLine>
        <S.Icons src={back} alt="이전으로" onClick={() => navigate(-1)} />
        가계부
        <S.Icons src={setting} alt="설정아이콘" onClick={() => handleTabClick('settings')} />
      </S.UpLine>

      <S.CalendarSection>
        <S.StyledCalendarWrapper>
          <Calendar
            onChange={onDateChange}
            value={date}
            formatDay={(locale, date) => date.getDate().toString()}
            formatShortWeekday={(locale, date) => weekDays[date.getDay()]}
            calendarType="gregory"
            next2Label={null}
            prev2Label={null}
            navigationLabel={({ date, view }) =>
              view === 'month' ? date.toLocaleString('en-US', { month: 'long' }) : null
            }
          />
        </S.StyledCalendarWrapper>
      </S.CalendarSection>

      <S.Details>
        <S.DetailSide>
          <S.PerDetail
            onClick={() => handleTabClick('stats')}
            $active={selectedTab === 'stats'}
            $dimOthers={!!selectedTab && selectedTab !== 'stats'}>
            <S.DetailIcons src={stats} alt="통계" />
            통계
          </S.PerDetail>

          <S.PerDetail
            onClick={() => handleTabClick('memo')}
            $active={selectedTab === 'memo'}
            $dimOthers={!!selectedTab && selectedTab !== 'memo'}>
            <S.DetailIcons src={memo} alt="메모" />
            메모
          </S.PerDetail>

          <S.PerDetail
            onClick={() => handleTabClick('search')}
            $active={selectedTab === 'search'}
            $dimOthers={!!selectedTab && selectedTab !== 'search'}>
            <S.DetailIcons src={search} alt="검색" />
            내역 검색
          </S.PerDetail>

          <S.PerDetail
            onClick={() => handleTabClick('category')}
            $active={selectedTab === 'category'}
            $dimOthers={!!selectedTab && selectedTab !== 'category'}>
            <S.DetailIcons src={filter} alt="필터" />
            카테고리
          </S.PerDetail>
        </S.DetailSide>
      </S.Details>

      <S.Details>
        <S.InOutcome>
          <div>수입</div>
          <S.IncomeWon>{totalIncome.toLocaleString()}원</S.IncomeWon>
        </S.InOutcome>
        <S.InOutcome>
          <div>지출</div>
          <S.OutcomeWon>{totalOutcome.toLocaleString()}원</S.OutcomeWon>
        </S.InOutcome>
      </S.Details>

      <S.Section>
        <S.SummaryCard>
          {selectedTab === 'stats' && (
            <>
              {donutChartData.length > 0 ? (
                <Donuts categories={donutChartData} size={170} />
              ) : (
                <div style={{ color: '#aaa', marginTop: 'auto', marginBottom: 'auto' }}>
                  조회 기간의 내역이 없어 통계를 표시할 수 없습니다.
                </div>
              )}
            </>
          )}
          {selectedTab === 'memo' && <ComingSoon onClick={closeOverlay} />}
          {selectedTab === 'search' && <ComingSoon onClick={closeOverlay} />}

          {selectedTab === 'category' && (
            <>
              <S.CategoryContentWrapper>
                {isLoading ? (
                  <div style={{ marginTop: '20px', color: '#aaa' }}>데이터 로딩 중...</div>
                ) : filteredDailyExpenses.length > 0 ? ( // 필터링된 내역 사용
                  filteredDailyExpenses.map((item) => (
                    <S.Perrow
                      key={item.ledgerId}
                      onClick={() => toggleSelection(item.ledgerId)}
                      $isMode={mode !== 'default'}>
                      {mode !== 'default' && <S.SelectCircle $selected={selectedIds.includes(item.ledgerId)} />}

                      <S.CategoryIcon src={dumcat} alt="카테고리 아이콘" />
                      <div style={{ flex: 1, marginLeft: '10px' }}>{item.merchant || item.categoryName}</div>
                      <div style={{ color: item.type === 'INCOME' ? '#68B6F3' : '#F87171' }}>
                        {item.amount.toLocaleString()}원
                      </div>
                    </S.Perrow>
                  ))
                ) : (
                  <div style={{ marginTop: '20px', color: '#aaa' }}>선택된 날짜의 내역이 없습니다.</div>
                )}
              </S.CategoryContentWrapper>

              <S.ActionContainer>
                {mode === 'default' ? (
                  <>
                    <S.ActionButton onClick={startEditMode} $actionType="initial">
                      <S.ActionIcon src={modifyIcon} alt="수정" />
                      수정
                    </S.ActionButton>
                    <S.ActionButton onClick={startDeleteMode} $actionType="initial">
                      <S.ActionIcon src={deleteIcon} alt="삭제" />
                      삭제
                    </S.ActionButton>
                  </>
                ) : (
                  <>
                    <S.ActionButton onClick={handleCancel}>
                      <span style={{ fontSize: '20px', fontWeight: 'bold', marginRight: '5px' }}>✕</span>
                      취소
                    </S.ActionButton>

                    <S.ActionButton
                      onClick={executeAction}
                      $actionType={mode}
                      $useOriginalIconColor={true}
                      $disabled={!isValidAction}>
                      <S.ActionIcon src={mode === 'edit' ? editBlue : deleteRed} alt="완료" />
                      {mode === 'edit' ? '수정' : '삭제'}
                    </S.ActionButton>
                  </>
                )}
              </S.ActionContainer>
            </>
          )}

          {!selectedTab && (
            <div style={{ color: '#aaa', marginTop: 'auto', marginBottom: 'auto' }}>
              버튼을 눌러 소비를 분석해보세요!
            </div>
          )}
        </S.SummaryCard>
      </S.Section>
      {(selectedTab === 'memo' || selectedTab === 'search' || selectedTab === 'settings') && (
        <ComingSoon onClick={closeOverlay} />
      )}
    </>
  );
};

export default LedgerCalendar;
