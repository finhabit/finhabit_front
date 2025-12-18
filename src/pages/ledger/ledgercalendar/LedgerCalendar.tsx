import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import type { CalendarProps } from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

import { getLedgerCalendar, deleteLedger } from '@/api/ledger.api';
import type { LedgerItem, CategoryStat, LedgerCalendarResponse } from '@/types/ledger';

import back from '@/assets/back.svg';
import stats from '@/assets/stats.svg';
import search from '@/assets/docsearch.svg';
import memo from '@/assets/memo.svg';
import filter from '@/assets/filter.svg';
import modifyIcon from '@/assets/modification.svg';
import deleteIcon from '@/assets/delete.svg';
import editBlue from '@/assets/editblue.svg';
import deleteRed from '@/assets/deletered.svg';

import categoryeat from '@/assets/categoryeat.svg';
import categoryshopping from '@/assets/categoryshopping.svg';
import categoryrest from '@/assets/categoryrest.svg';
import categorytran from '@/assets/categorytran.svg';
import categoryetc from '@/assets/etcbtn.svg';
import categorysalary from '@/assets/salarybtn.svg';
import categoryallow from '@/assets/allowancebtn.svg';

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

const CATEGORY_ICONS: Record<string, string> = {
  식비: categoryeat,
  쇼핑: categoryshopping,
  여가: categoryrest,
  교통: categorytran,
  기타: categoryetc,
  급여: categorysalary,
  용돈: categoryallow,
};

const LedgerCalendar: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>(new Date());
  const [selectedTab, setSelectedTab] = useState<string | null>('category');

  const [dailyExpenses, setDailyExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([]);

  const [mode, setMode] = useState<'default' | 'edit' | 'delete'>('default');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const currentYear = useMemo(() => date.getFullYear().toString(), [date]);
  const currentMonth = useMemo(() => (date.getMonth() + 1).toString().padStart(2, '0'), [date]);

  const getCategoryIcon = (name: string) => {
    return CATEGORY_ICONS[name] || categoryetc;
  };

  const fetchCalendarData = async () => {
    setIsLoading(true);
    try {
      const responseData: LedgerCalendarResponse = await getLedgerCalendar(currentYear, currentMonth);

      setDailyExpenses(responseData.ledgers || []);
      setCategoryStats(responseData.categories || []);
    } catch (error) {
      console.error('가계부 캘린더 데이터 로드 실패:', error);
      alert('데이터 로드에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const donutChartData: DonutCategory[] = useMemo(() => {
    if (categoryStats.length === 0) return [];

    return categoryStats.map((stat, index) => ({
      id: stat.categoryId,
      label: stat.categoryName,
      ratio: stat.percent,
      color: CHART_COLORS[index % CHART_COLORS.length],
    }));
  }, [categoryStats]);

  useEffect(() => {
    fetchCalendarData();
  }, [currentYear, currentMonth]);

  const onDateChange: CalendarProps['onChange'] = (value) => {
    if (value instanceof Date) {
      setDate(value);
      setSelectedTab('category');
    }
  };

  const filteredDailyExpenses = useMemo(() => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const selectedDateStr = `${year}-${month}-${day}`;

    return dailyExpenses.filter((item) => item.date === selectedDateStr);
  }, [dailyExpenses, date]);

  const { dailyIncome, dailyOutcome } = useMemo(() => {
    const income = filteredDailyExpenses.filter((item) => item.amount > 0).reduce((acc, cur) => acc + cur.amount, 0);

    const outcome = filteredDailyExpenses.filter((item) => item.amount < 0).reduce((acc, cur) => acc + cur.amount, 0);

    return { dailyIncome: income, dailyOutcome: outcome };
  }, [filteredDailyExpenses]);

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
      if (selectedIds.includes(id)) {
        setSelectedIds([]);
      } else {
        setSelectedIds([id]);
      }
    } else if (mode === 'delete') {
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
          console.log('삭제 요청 ID 목록:', selectedIds);

          await Promise.all(selectedIds.map((id) => deleteLedger(id)));

          alert('성공적으로 삭제되었습니다.');
          handleCancel();
          await fetchCalendarData();
        } catch (error) {
          console.error('삭제 실패:', error);
          alert('삭제에 실패했습니다. 다시 시도해 주세요.');
        }
      }
    } else if (mode === 'edit') {
      const itemToEdit = dailyExpenses.find((item) => item.ledgerId === selectedIds[0]);

      if (itemToEdit) {
        navigate('/consumeplus', {
          state: {
            mode: 'edit',
            ledgerId: itemToEdit.ledgerId,
            initialData: {
              ...itemToEdit,
              amount: Math.abs(itemToEdit.amount),
            },
          },
        });
      }
    }
  };

  const closeOverlay = () => {
    setSelectedTab(null);
  };

  return (
    <>
      <S.UpLine>
        <S.Icons src={back} alt="이전으로" onClick={() => navigate('/ledger')} />
        가계부
        <div> </div>
      </S.UpLine>

      <S.CalendarSection>
        <S.StyledCalendarWrapper>
          <Calendar
            onChange={onDateChange}
            value={date}
            formatDay={(_, date) => date.getDate().toString()}
            formatShortWeekday={(_, date) => weekDays[date.getDay()]}
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
          <S.InOutComeTitle>수입</S.InOutComeTitle>
          <S.IncomeWon>{dailyIncome.toLocaleString()}원</S.IncomeWon>
        </S.InOutcome>
        <S.InOutcome>
          <S.InOutComeTitle>지출</S.InOutComeTitle>
          <S.OutcomeWon>{Math.abs(dailyOutcome).toLocaleString()}원</S.OutcomeWon>
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
                ) : filteredDailyExpenses.length > 0 ? (
                  filteredDailyExpenses.map((item) => {
                    const isIncome = item.amount > 0;

                    return (
                      <S.Perrow
                        key={item.ledgerId}
                        onClick={() => toggleSelection(item.ledgerId)}
                        $isMode={mode !== 'default'}>
                        {mode !== 'default' && <S.SelectCircle $selected={selectedIds.includes(item.ledgerId)} />}

                        <S.CategoryIcon src={getCategoryIcon(item.categoryName)} alt="카테고리 아이콘" />

                        <S.CategoryName>
                          <span>{item.categoryName}</span>
                          {item.merchant && item.merchant !== item.categoryName}
                        </S.CategoryName>
                        <S.Costs style={{ color: isIncome ? '#68B6F3' : '#F87171' }}>
                          {Math.abs(item.amount).toLocaleString()}원
                        </S.Costs>
                      </S.Perrow>
                    );
                  })
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
    </>
  );
};

export default LedgerCalendar;
