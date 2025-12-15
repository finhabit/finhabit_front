import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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

interface Expense {
  id: number;
  category: string;
  amount: number;
}

const LedgerCalendar: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>(new Date());
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  const [mode, setMode] = useState<'default' | 'edit' | 'delete'>('default');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, category: '음료', amount: 2000 },
    { id: 2, category: '음료', amount: 2000 },
  ]);

  const onDateChange = (value: Date | Date[]) => {
    if (value instanceof Date) {
      setDate(value);
    }
  };

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

  const executeAction = () => {
    if (!isValidAction) return;

    if (mode === 'delete') {
      if (confirm(`${selectedIds.length}개의 항목을 삭제하시겠습니까?`)) {
        setExpenses((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
        handleCancel();
      }
    } else if (mode === 'edit') {
      navigate('/consumeplus', { state: { id: selectedIds[0] } });
    }
  };

  const closeOverlay = () => {
    setSelectedTab(null);
  };

  // 다중 카테고리 테스트 데이터, 이후 연동시 다른값으로 바꿔 사용
  const MultiCategoryData = [
    { id: 1, label: '식비', ratio: 45, color: '#b6be40ff' }, // 45%
    { id: 2, label: '교통', ratio: 20, color: '#626b00ff' }, // 20%
    { id: 3, label: '문화', ratio: 15, color: '#cbd638ff' }, // 15%
    { id: 4, label: '저축', ratio: 20, color: '#3e4300ff' }, // 20%
  ];

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
          <S.IncomeWon>0원</S.IncomeWon>
        </S.InOutcome>
        <S.InOutcome>
          <div>지출</div>
          <S.OutcomeWon>2000원</S.OutcomeWon>
        </S.InOutcome>
      </S.Details>

      <S.Section>
        <S.SummaryCard>
          {selectedTab === 'stats' && <Donuts categories={MultiCategoryData} size={170} />}
          {selectedTab === 'memo' && <div>메모 내용</div>}
          {selectedTab === 'search' && <div>내역 검색 내용</div>}

          {selectedTab === 'category' && (
            <>
              <S.CategoryContentWrapper>
                {expenses.length > 0 ? (
                  expenses.map((item) => (
                    <S.Perrow key={item.id} onClick={() => toggleSelection(item.id)} $isMode={mode !== 'default'}>
                      {mode !== 'default' && <S.SelectCircle $selected={selectedIds.includes(item.id)} />}

                      <S.CategoryIcon src={dumcat} alt="카테고리 아이콘" />
                      <div style={{ flex: 1, marginLeft: '10px' }}>{item.category}</div>
                      <div>{item.amount.toLocaleString()}원</div>
                    </S.Perrow>
                  ))
                ) : (
                  <div style={{ marginTop: '20px', color: '#aaa' }}>내역이 없습니다.</div>
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
