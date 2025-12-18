import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LevelCard from '@/components/LevelCard';
import * as S from './LevelTest.style';
import levellogo from '@/assets/levellogo.svg';

import { getLevelTestQuestions } from '@/api/levelTest.api';
import { signup } from '@/api/auth.api';
import type { LevelQuestionDto } from '@/api/levelTest.api';

type Question = {
  id: number;
  title: string;
  options: string[];
  correctAnswer: number;
};

const LevelTest = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const signupData = location.state?.signupData;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [score, setScore] = useState<number>(0);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [signupResult, setSignupResult] = useState<any>(null);

  useEffect(() => {
    if (!signupData) {
      alert('잘못된 접근입니다. 회원가입 정보를 먼저 입력해주세요.');
      navigate('/signup');
    }
  }, [signupData, navigate]);

  useEffect(() => {
    let isMounted = true;

    const fetchQuestions = async () => {
      try {
        const data = await getLevelTestQuestions();

        if (isMounted) {
          const uniqueData = data.filter(
            (item: LevelQuestionDto, index: number, self: LevelQuestionDto[]) =>
              index === self.findIndex((t) => t.testQuestion === item.testQuestion),
          );

          const finalData = uniqueData.length > 5 ? uniqueData.slice(0, 5) : uniqueData;

          const formattedQuestions: Question[] = finalData.map((item: LevelQuestionDto) => ({
            id: item.testId,
            title: item.testQuestion,
            options: [item.testOption1, item.testOption2, item.testOption3],
            correctAnswer: item.testAnswer - 1,
          }));

          setQuestions(formattedQuestions);

          const initialAnswers: Record<number, number | null> = {};
          formattedQuestions.forEach((q) => {
            initialAnswers[q.id] = null;
          });
          setAnswers(initialAnswers);
        }
      } catch (error) {
        if (isMounted) {
          console.error('문제를 불러오는데 실패했습니다:', error);
          alert('문제를 불러올 수 없습니다.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchQuestions();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelect = (questionId: number, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const allAnswered = questions.length > 0 && questions.every((q) => answers[q.id] !== null);

  const handleSubmit = async () => {
    if (!allAnswered || !signupData) return;

    const correctAnswersCount = questions.filter((q) => answers[q.id] === q.correctAnswer).length;
    const calculatedScore = Math.round((correctAnswersCount / questions.length) * 100);
    setScore(calculatedScore);

    const levelTestAnswers = questions.map((q) => ({
      testId: q.id,
      userAnswer: (answers[q.id] as number) + 1,
    }));

    try {
      const response = await signup({
        ...signupData,
        levelTestAnswers,
      });

      console.log('회원가입 성공 응답:', response);

      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
      }

      setSignupResult(response);

      setShowPopup(true);
    } catch (error: any) {
      console.error('회원가입 및 결과 전송 실패:', error);
      const errorMessage = error.response?.data?.message || '회원가입 중 오류가 발생했습니다.';
      alert(errorMessage);
    }
  };

  const handleStart = () => {
    navigate('/home', {
      state: {
        userInfo: signupResult,
      },
    });
  };

  const getResultText = (currentScore: number) => {
    if (currentScore <= 40) return '금융의 첫걸음부터 함께해요!';
    if (currentScore <= 70) return '꽤 알고 계시네요! 이제 습관을 만들어볼까요?';
    return '이제 투자와 자산관리까지 한 단계 더!';
  };

  const getLevelName = (currentScore: number) => {
    if (currentScore <= 40) return '기초';
    if (currentScore <= 70) return '중간';
    return '상급';
  };

  if (loading) return <div>Loading...</div>;

  return (
    <S.Container>
      <S.Content>
        <S.Title>금융 지식을 얼마나 아는지 확인하기!</S.Title>

        <S.QuestionList>
          {questions.map((q) => (
            <LevelCard
              key={q.id}
              title={q.title}
              options={q.options}
              selectedIndex={answers[q.id]}
              onSelect={(index: number) => handleSelect(q.id, index)}
            />
          ))}
        </S.QuestionList>

        <S.SubmitButton type="button" onClick={handleSubmit} disabled={!allAnswered} $active={allAnswered}>
          회원가입 완료하기
        </S.SubmitButton>
      </S.Content>

      {showPopup && (
        <S.PopupOverlay>
          <S.PopupContent>
            <S.PopupText>
              <S.PopupTitle>정답률 {score}%</S.PopupTitle>
              <S.PopupMessage>{getResultText(score)}</S.PopupMessage>
            </S.PopupText>

            <S.PopupImage src={levellogo} alt="levellogo" />

            <S.PopupButton onClick={handleStart}>{getLevelName(score)}형 Finhabit 시작하기</S.PopupButton>
          </S.PopupContent>
        </S.PopupOverlay>
      )}
    </S.Container>
  );
};

export default LevelTest;
