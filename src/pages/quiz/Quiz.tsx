import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import back from '@/assets/back.svg';
import weekFilterIcon from '@/assets/weekfilter.svg';
import ComingSoon from '@/components/ComingSoon';
import * as S from './Quiz.style';

import { getTodayQuiz, submitQuizAnswer, getTodayQuizExplanation, getQuizList } from '@/api/quiz.api';
import type { TodayQuiz, TodayQuizExplanation, WeeklyQuizHistory } from '@/types/quiz';

export default function Quiz() {
  const navigate = useNavigate();

  const [todayQuiz, setTodayQuiz] = useState<TodayQuiz | null>(null);
  const [explanationData, setExplanationData] = useState<TodayQuizExplanation | null>(null);
  const [historyData, setHistoryData] = useState<WeeklyQuizHistory[]>([]);
  const [currentWeekLabel, setCurrentWeekLabel] = useState<string>('');
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    loadPageData();
  }, []);

  const loadPageData = async () => {
    try {
      const listData = await getQuizList();
      const cleanMonthLabel = listData.monthLabel.replace(/^\d{4}[-.년]\s*/, '');

      const formattedHistory = listData.weeklyHistory.map((history) => {
        if (history.weekLabel.includes('-')) {
          return {
            ...history,
            weekLabel: getFormattedWeek(history.weekLabel),
          };
        }

        return {
          ...history,
          weekLabel: `${cleanMonthLabel} ${history.weekLabel}`,
        };
      });

      setHistoryData(formattedHistory);

      if (formattedHistory.length > 0) {
        setCurrentWeekLabel(formattedHistory[0].weekLabel);
      }

      const quizData = await getTodayQuiz();
      setTodayQuiz(quizData);

      if (quizData.isAnswered) {
        const expData = await getTodayQuizExplanation();
        setExplanationData(expData);
        setSelected(expData.answer);
        setIsCorrect(expData.isCorrect);
        setShowResult(true);
      }
    } catch (error) {
      console.error('데이터 로딩 실패:', error);
    }
  };

  const handleChoice = async (index: number) => {
    if (selected !== null || !todayQuiz) return;

    try {
      setSelected(index);

      const submitResult = await submitQuizAnswer(todayQuiz.quizId, index + 1);

      setIsCorrect(submitResult.isCorrect);

      setTimeout(async () => {
        const expData = await getTodayQuizExplanation();
        setExplanationData(expData);
        setShowResult(true);
      }, 2000);
    } catch (error) {
      console.error('정답 제출 실패:', error);
      alert('정답 제출 중 오류가 발생했습니다.');
      setSelected(null);
    }
  };

  const handleWeekSelect = (weekLabel: string) => {
    setCurrentWeekLabel(weekLabel);
    setIsFilterOpen(false);
  };

  const openOverlay = () => setIsOverlayOpen(true);
  const closeOverlay = () => setIsOverlayOpen(false);

  const currentHistoryList = useMemo(() => {
    const targetWeek = historyData.find((h) => h.weekLabel === currentWeekLabel);
    return targetWeek ? targetWeek.quizzes : [];
  }, [historyData, currentWeekLabel]);

  const quizChoices = useMemo(() => {
    if (!todayQuiz) return [];
    return [`① ${todayQuiz.option1}`, `② ${todayQuiz.option2}`, `③ ${todayQuiz.option3}`];
  }, [todayQuiz]);

  const realCorrectAnswerIndex = explanationData ? explanationData.answer - 1 : -1;

  return (
    <>
      <S.UpLine>
        <S.Icons src={back} alt="이전으로" onClick={() => navigate(-1)} />
        퀴즈
      </S.UpLine>

      <S.RemindingSection>
        <S.N_Section>
          오늘의 퀴즈
          <S.ContentBox>
            {todayQuiz ? (
              <>
                <S.QuizTitle>{todayQuiz.question}</S.QuizTitle>

                <S.QuizChoicesText $isResultMode={showResult}>
                  {quizChoices.map((txt, idx) => (
                    <div key={idx}>
                      <S.HighlightText $isCorrect={showResult && idx === realCorrectAnswerIndex}>{txt}</S.HighlightText>
                    </div>
                  ))}
                </S.QuizChoicesText>

                {showResult && explanationData && (
                  <S.ExplanationBox>
                    <S.ExplanationTitle>해설</S.ExplanationTitle>
                    <S.ExplanationDesc>{explanationData.explanation}</S.ExplanationDesc>
                  </S.ExplanationBox>
                )}
              </>
            ) : (
              <div style={{ padding: '20px', textAlign: 'center' }}>퀴즈를 불러오는 중...</div>
            )}
          </S.ContentBox>
          {todayQuiz && selected === null && (
            <S.ButtonRow>
              {[1, 2, 3].map((num, idx) => (
                <S.NumberBtn key={num} onClick={() => handleChoice(idx)}>
                  {num === 1 ? '①' : num === 2 ? '②' : '③'}
                </S.NumberBtn>
              ))}
            </S.ButtonRow>
          )}
          {selected !== null && !showResult && isCorrect !== null && (
            <S.FeedbackRow>
              <S.BigCircle $isActive={isCorrect === true} />
              <S.BigX $isActive={isCorrect === false} />
            </S.FeedbackRow>
          )}
          {showResult && <S.MoreLink onClick={openOverlay}>관련 내용 더 알아보기</S.MoreLink>}
        </S.N_Section>

        <S.N_Section>
          <S.FilterHeader>
            이번 주 퀴즈 모아보기
            <S.FilterIcon src={weekFilterIcon} alt="필터" onClick={() => setIsFilterOpen(!isFilterOpen)} />
            {isFilterOpen && (
              <S.FilterModal>
                {historyData.map((week) => (
                  <S.ModalItem
                    key={week.weekLabel}
                    $isSelected={week.weekLabel === currentWeekLabel}
                    onClick={() => handleWeekSelect(week.weekLabel)}>
                    {week.weekLabel}
                  </S.ModalItem>
                ))}
                {historyData.length === 0 && <S.ModalItem>기록 없음</S.ModalItem>}
              </S.FilterModal>
            )}
          </S.FilterHeader>

          <S.CollectionBox>
            <S.WeekLabel>{currentWeekLabel || '기록 없음'}</S.WeekLabel>

            {currentHistoryList.length > 0 ? (
              currentHistoryList.map((item) => (
                <S.HistoryItem key={item.quizId}>
                  <S.HistoryDate>{item.attemptedDate}</S.HistoryDate>
                  <S.HistoryTitle>{item.cardTitle}</S.HistoryTitle>
                  <S.HistoryResult $isCorrect={item.isCorrect}>{item.isCorrect ? '정답' : '오답'}</S.HistoryResult>
                </S.HistoryItem>
              ))
            ) : (
              <div style={{ padding: '40px 0', color: '#999', fontSize: '13px' }}>아직 푼 퀴즈가 없어요!</div>
            )}
            <div style={{ flex: 1 }}></div>
          </S.CollectionBox>
        </S.N_Section>
      </S.RemindingSection>

      {isOverlayOpen && <ComingSoon onClick={closeOverlay} />}
    </>
  );
}

// M월 n주차 변환 함수
function getFormattedWeek(dateInput: string | Date): string {
  let date: Date;

  if (typeof dateInput === 'string') {
    if (!dateInput.includes('-')) return dateInput;

    const [year, month, day] = dateInput.split('-').map(Number);
    date = new Date(year, month - 1, day);
  } else {
    date = dateInput;
  }

  if (isNaN(date.getTime())) return typeof dateInput === 'string' ? dateInput : '';

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const week = Math.ceil((day + firstDayOfMonth) / 7);

  return `${month}월 ${week}주차`;
}
