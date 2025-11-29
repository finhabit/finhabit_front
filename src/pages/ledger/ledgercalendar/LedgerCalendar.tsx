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
import Donuts from '@/components/Donuts';
import dumcat from '@/assets/categoryeat.svg';

import modifyIcon from '@/assets/modification.svg';
import deleteIcon from '@/assets/delete.svg';

import * as S from './LedgerCalendar.style';

const weekDays: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const LedgerCalendar: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>(new Date());
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  const onDateChange = (value: Date | Date[]) => {
    if (value instanceof Date) {
      setDate(value);
    }
  };

  const handleTabClick = (tabName: string) => {
    setSelectedTab((prev) => (prev === tabName ? null : tabName));
  };

  const handleEdit = () => {
    // 이후 수정기능 구현
  };

  const handleDelete = () => {
    // 이후 api연동해서 삭제기능 구현
  };

  return (
    <>
      <S.UpLine>
        <S.Icons src={back} alt="이전으로" onClick={() => navigate(-1)} />
        가계부
        <S.Icons src={setting} alt="설정아이콘" />
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

      {/* --- 버튼 4개 --- */}
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
          {selectedTab === 'stats' && <Donuts />}
          {selectedTab === 'memo' && <div>메모 내용</div>}
          {selectedTab === 'search' && <div>내역 검색 내용</div>}

          {selectedTab === 'category' && (
            <>
              <S.CategoryContentWrapper>
                <S.Perrow>
                  <S.CategoryIcon src={dumcat} alt="더미 카테고리 아이콘" />
                  <div>음료</div>
                  <div>2,000원</div>
                </S.Perrow>
              </S.CategoryContentWrapper>

              <S.ActionContainer>
                <S.ActionButton onClick={handleEdit}>
                  <S.ActionIcon src={modifyIcon} alt="수정" />
                  수정
                </S.ActionButton>
                <S.ActionButton onClick={handleDelete}>
                  <S.ActionIcon src={deleteIcon} alt="삭제" />
                  삭제
                </S.ActionButton>
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
