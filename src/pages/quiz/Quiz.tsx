import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import back from '@/assets/back.svg';
import weekFilterIcon from '@/assets/weekfilter.svg';
import ComingSoon from '@/components/ComingSoon';
import * as S from './Quiz.style';

export default function Quiz() {
  const navigate = useNavigate();

  const weekOptions = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    return Array.from({ length: 5 }, (_, i) => `${currentMonth}월 ${i + 1}주차`);
  }, []);

  const [currentWeek, setCurrentWeek] = useState(weekOptions[0]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const quizHistory = [
    { id: 1, date: '2025.12.02', question: 'Q. 신용카드 기초', isCorrect: true, week: weekOptions[0] }, // 1주차
    { id: 2, date: '2025.12.10', question: 'Q. 적금과 예금 차이', isCorrect: false, week: weekOptions[1] }, // 2주차
    { id: 3, date: '2025.12.25', question: 'Q. 신용점수 관리의 중요성', isCorrect: false, week: weekOptions[3] }, // 4주차
    { id: 4, date: '2025.12.28', question: 'Q. 보험의 역할', isCorrect: true, week: weekOptions[3] }, // 4주차
  ];

  const detailedExplanation = `연체는 신용점수에 가장 큰 악영향을 줍니다.
대출·카드값을 제때 갚지 않으면 신용점수가 빠르게 떨어지고, 회복하는 데는 오랜 시간이 걸립니다.
또한, 카드를 너무 많이 만들거나 소액 대출을 자주 받는 행동도 신용점수 하락의 원인이 됩니다. 금융기관 입장에서는 "지출 위험이 높은 사람"으로 판단되기 때문입니다.

신용점수를 올리기 위해서는
• 납부일을 놓치지 않기
• 불필요한 대출 줄이기
• 카드 개수 최소화
• 꾸준한 금융 이력 쌓기(자동이체·통신비 성실 납부 등)
이 중요합니다.

결론적으로 '연체하지 않는 습관'이 신용점수 상승의 핵심입니다.`;

  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const realCorrectAnswer = 0;
  const choices = ['① 연체하지 않기', '② 카드 많이 만들기', '③ 대출 자주 받기'];

  const handleChoice = (index: number) => {
    if (selected !== null) return;

    setSelected(index);
    const correct = index === realCorrectAnswer;
    setIsCorrect(correct);

    setTimeout(() => {
      setShowResult(true);
    }, 2000);
  };

  const handleWeekSelect = (week: string) => {
    setCurrentWeek(week);
    setIsFilterOpen(false);
  };

  const filteredHistory = quizHistory.filter((item) => item.week === currentWeek);

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const openOverlay = () => {
    setIsOverlayOpen(true);
  };
  const closeOverlay = () => {
    setIsOverlayOpen(false);
  };

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
            <S.QuizTitle>Q. 신용점수를 올리려면 어떻게 해야 할까요?</S.QuizTitle>

            <S.QuizChoicesText $isResultMode={showResult}>
              {choices.map((txt, idx) => (
                <div key={idx}>
                  <S.HighlightText $isCorrect={showResult && idx === realCorrectAnswer}>{txt}</S.HighlightText>
                </div>
              ))}
            </S.QuizChoicesText>

            {showResult && (
              <S.ExplanationBox>
                <S.ExplanationTitle>신용점수 관리의 중요성</S.ExplanationTitle>
                <S.ExplanationDesc>
                  신용점수는 '금융 신뢰도'입니다. <br />
                  연체나 과도한 대출은 점수를 낮춥니다.
                </S.ExplanationDesc>
              </S.ExplanationBox>
            )}
          </S.ContentBox>
          {selected === null && (
            <S.ButtonRow>
              {[1, 2, 3].map((num, idx) => (
                <S.NumberBtn key={num} onClick={() => handleChoice(idx)}>
                  {num === 1 ? '①' : num === 2 ? '②' : '③'}
                </S.NumberBtn>
              ))}
            </S.ButtonRow>
          )}
          {selected !== null && !showResult && (
            <S.FeedbackRow>
              <S.BigCircle $isActive={isCorrect === true} />
              <S.BigX $isActive={isCorrect === false} />
            </S.FeedbackRow>
          )}
          {showResult && <S.MoreLink onClick={openOverlay}>관련 내용 더 알아보기</S.MoreLink>}
        </S.N_Section>

        <S.N_Section>
          {showResult && (
            <>
              문제 해설
              <S.DetailBox>{detailedExplanation}</S.DetailBox>
            </>
          )}

          {selected === null && (
            <>
              <S.FilterHeader>
                이번 주 퀴즈 모아보기
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

              <S.CollectionBox>
                <S.WeekLabel>{currentWeek}</S.WeekLabel>

                {filteredHistory.length > 0 ? (
                  filteredHistory.map((item) => (
                    <S.HistoryItem key={item.id}>
                      <S.HistoryDate>{item.date}</S.HistoryDate>
                      <S.HistoryTitle>{item.question}</S.HistoryTitle>
                      <S.HistoryResult $isCorrect={item.isCorrect}>{item.isCorrect ? '정답' : '오답'}</S.HistoryResult>
                    </S.HistoryItem>
                  ))
                ) : (
                  <div style={{ padding: '40px 0', color: '#999', fontSize: '13px' }}>아직 푼 퀴즈가 없어요!</div>
                )}
                <div style={{ flex: 1 }}></div>
              </S.CollectionBox>
            </>
          )}
        </S.N_Section>
      </S.RemindingSection>
      {isOverlayOpen && <ComingSoon onClick={closeOverlay} />}
    </>
  );
}
