import { useState, useEffect, useMemo, useCallback } from 'react';
import BottomNav from '@/components/BottomNav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { getTodayFinanceQuiz, getWeeklyArchive } from '@/api/finance.api';
import type { TodayFinance, TodayQuiz, WeeklyArchiveItem } from '@/types/finance';

import bellIcon from '@/assets/bell.svg';
import bulbIcon from '@/assets/bulb.svg';
import quizIcon from '@/assets/quiz.svg';
import calendarIcon from '@/assets/calendar.svg';
import plusIcon from '@/assets/plus.svg';

import * as S from './Finance.style';

// 기본 데이터 (로딩 실패 시 표시할 정적 데이터)
const DEFAULT_FINANCE: TodayFinance = {
  financeId: 0,
  cardTitle: '신용점수 관리의 중요성',
  cardContent: '신용점수는 ‘금융 신뢰도’입니다.\n연체나 과도한 대출은 점수를 낮춥니다.',
  cardLevel: 1,
  openDate: '',
};

const DEFAULT_QUIZ: TodayQuiz = {
  quizId: 0,
  question: '신용점수를 올리려면 어떻게 해야 할까요?',
  option1: '연체하지 않기',
  option2: '카드 많이 만들기',
  option3: '대출 자주 받기',
  isAnswered: false,
};

export default function Finance() {
  const navigate = useNavigate();
  const gaps = useMemo(() => ({ afterFirst: 33, afterSecond: 27 }), []);

  const [finance, setFinance] = useState<TodayFinance>(DEFAULT_FINANCE);
  const [quiz, setQuiz] = useState<TodayQuiz>(DEFAULT_QUIZ);
  const [archiveItems, setArchiveItems] = useState<WeeklyArchiveItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { todayFinance, todayQuiz } = await getTodayFinanceQuiz();
      setFinance(todayFinance || DEFAULT_FINANCE);
      setQuiz(todayQuiz || DEFAULT_QUIZ);

      const weeklyData = await getWeeklyArchive();
      setArchiveItems(weeklyData.slice(0, 2));
    } catch (err) {
      console.error('금융 데이터 로딩 실패:', err);

      let errorMessage = '데이터 로딩에 실패했습니다.';

      if (axios.isAxiosError(err) && err.response?.status === 401) {
        errorMessage = '인증이 필요합니다. 로그인 상태를 확인해 주세요.';
        setArchiveItems([]);
      }
      setError(errorMessage);

      if (!finance.financeId) setFinance(DEFAULT_FINANCE);
      if (!quiz.quizId) setQuiz(DEFAULT_QUIZ);
    } finally {
      setIsLoading(false);
    }
  }, [finance.financeId, quiz.quizId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatQuizOptions = useMemo(() => {
    const options = [];
    if (quiz.option1) options.push(`① ${quiz.option1}`);
    if (quiz.option2) options.push(`② ${quiz.option2}`);
    if (quiz.option3) options.push(`③ ${quiz.option3}`);
    return options.join(' ');
  }, [quiz.option1, quiz.option2, quiz.option3]);

  const handleKnowledgeClick = (id: number) => {
    if (id !== 0) navigate(`/knowledge/${id}`);
  };

  const handleQuizClick = (id: number) => {
    if (id !== 0) navigate(`/quiz/${id}`);
  };

  const splitContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  if (isLoading) {
    return (
      <S.Screen>
        <S.SafeArea>
          <S.Section style={{ textAlign: 'center', marginTop: '100px' }}>
            <S.TitleText>데이터 로딩 중...</S.TitleText>
          </S.Section>
        </S.SafeArea>
        <BottomNav />
      </S.Screen>
    );
  }

  return (
    <S.Screen>
      <S.SafeArea>
        <S.Header>
          <S.HeaderSpacer />
          <S.HeaderIcons>
            <S.IconBtn aria-label="알림">
              <S.TopIcon src={bellIcon} alt="bell" onClick={() => navigate('/notification')} />
            </S.IconBtn>
          </S.HeaderIcons>
        </S.Header>

        {/* 오늘의 지식 */}
        <S.Section>
          <S.TitleRow>
            <S.Left>
              <S.TinyIcon src={bulbIcon} alt="지식" />
              <S.TitleText>오늘의 지식</S.TitleText>
            </S.Left>
            <S.Right>
              <S.TinyPlus src={plusIcon} alt="추가" onClick={() => navigate('/knowledge')} />
            </S.Right>
          </S.TitleRow>

          <S.CardKnowledge onClick={() => handleKnowledgeClick(finance.financeId)}>
            <S.CardBody>
              <S.CardTop>{finance.cardTitle}</S.CardTop>
              <S.CardTitle>{splitContent(finance.cardContent)}</S.CardTitle>
            </S.CardBody>
          </S.CardKnowledge>

          <S.Gap style={{ height: gaps.afterFirst }} />
        </S.Section>

        {/* 오늘의 퀴즈 */}
        <S.Section>
          <S.TitleRow>
            <S.Left>
              <S.TinyIcon src={quizIcon} alt="퀴즈" />
              <S.TitleText>오늘의 퀴즈</S.TitleText>
            </S.Left>
            <S.Right>
              <S.TinyPlus src={plusIcon} alt="추가" onClick={() => navigate('/quiz')} />
            </S.Right>
          </S.TitleRow>

          <S.CardQuiz onClick={() => handleQuizClick(quiz.quizId)}>
            <S.CardBody>
              <S.CardTop>Q. {quiz.question}</S.CardTop>
              <S.Q_CardTitle>{formatQuizOptions}</S.Q_CardTitle>
            </S.CardBody>
          </S.CardQuiz>

          <S.Gap style={{ height: gaps.afterSecond }} />
        </S.Section>

        {/* 주간 월간 모아보기 */}
        <S.Section>
          <S.TitleRow>
            <S.Left>
              <S.TinyIcon src={calendarIcon} alt="모아보기" />
              <S.TitleText>주간 월간 모아보기</S.TitleText>
            </S.Left>
            <S.Right>
              <S.TinyPlus src={plusIcon} alt="추가" onClick={() => navigate('/knowledge')} />
            </S.Right>
          </S.TitleRow>

          <S.CardArchive>
            <S.CardBody1>
              {archiveItems.length > 0 ? (
                archiveItems.map((item) => (
                  <S.Card1 key={item.financeId} onClick={() => handleKnowledgeClick(item.financeId)}>
                    <S.CardTop>{item.cardTitle}</S.CardTop>
                    <S.A_CardTitle>{splitContent(item.cardContent)}</S.A_CardTitle>
                  </S.Card1>
                ))
              ) : (
                <div style={{ padding: '20px', textAlign: 'center', color: error ? 'red' : '#aaa' }}>
                  {error || '아직 열어본 주간 금융 지식이 없습니다.'}
                  {error && <div style={{ marginTop: '10px', fontSize: '14px' }}>로그인 후 다시 시도해주세요.</div>}
                </div>
              )}
            </S.CardBody1>
          </S.CardArchive>
        </S.Section>

        <S.BottomSpacer />
      </S.SafeArea>

      <BottomNav />
    </S.Screen>
  );
}
