import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import back from "../../../assets/back.png";
import setting from "../../../assets/setting.png";
import stats from "../../../assets/stats.png";
import search from "../../../assets/search.png";
import memo from "../../../assets/memo.png";
import Donuts from "../../../components/Donuts";
import filter from "../../../assets/filter.png";
import * as S from "./LedgerCalendar.style";

const weekDays: string[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const LedgerCalendar: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>(new Date());

  const onDateChange = (
    value: Date | Date[],
  ) => {
    if (value instanceof Date) {
      setDate(value);
    }
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
              view === "month"
                ? date.toLocaleString("en-US", { month: "long" })
                : null
            }
          />
        </S.StyledCalendarWrapper>
      </S.CalendarSection>
      <S.Details>
        <S.DetailSide>
          <S.PerDetail>
            <S.DetailIcons src={stats} alt="통계" />
            통계
          </S.PerDetail>
          <S.PerDetail>
            <S.DetailIcons src={memo} alt="메모" />
            메모
          </S.PerDetail>
        </S.DetailSide>
        <S.DetailSide>
          <S.PerDetail>
            <S.DetailIcons src={search} alt="검색" />
            내역 검색
          </S.PerDetail>
          <S.PerDetail>
            <S.DetailIcons src={filter} alt="필터" />
            필터
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
          <Donuts />
        </S.SummaryCard>
      </S.Section>
    </>
  );
};

export default LedgerCalendar;