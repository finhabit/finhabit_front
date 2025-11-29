import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import back from '@/assets/back.svg';
import * as S from './Quiz.style';

const quizHistory = [
  { id: 1, date: '2025.11.25', question: 'Q. 신용점수 관리의 중요성', isCorrect: false },
  { id: 2, date: '2025.11.28', question: 'Q. 보험의 역할', isCorrect: true },
];

export default function Quiz() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const realCorrectAnswer = 0;

  const choices = ['① 연체하지 않기', '② 카드 많이 만들기', '③ 대출 자주 받기'];

  const handleChoice = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    setIsCorrect(index === realCorrectAnswer);
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

            <S.QuizChoicesText $isCorrect={isCorrect === true}>
              {choices.map((txt, idx) => (
                <div key={idx}>
                  <S.HighlightText $isCorrect={isCorrect === true && idx === realCorrectAnswer}>{txt}</S.HighlightText>
                </div>
              ))}
            </S.QuizChoicesText>

            {isCorrect === true && (
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
          {isCorrect === false && (
            <S.FeedbackRow>
              <S.BigCircle />
              <S.BigX />
            </S.FeedbackRow>
          )}
          {isCorrect === true && <S.MoreLink>관련 내용 더 알아보기</S.MoreLink>}
        </S.N_Section>

        <S.N_Section>
          퀴즈 모아보기
          <S.CollectionBox>
            {quizHistory.map((item) => (
              <S.HistoryItem key={item.id}>
                <S.HistoryDate>{item.date}</S.HistoryDate>
                <S.HistoryTitle>{item.question}</S.HistoryTitle>
                <S.HistoryResult $isCorrect={item.isCorrect}>{item.isCorrect ? '정답' : '오답'}</S.HistoryResult>
              </S.HistoryItem>
            ))}
            <div style={{ flex: 1 }}></div>
          </S.CollectionBox>
        </S.N_Section>
      </S.RemindingSection>
    </>
  );
}
