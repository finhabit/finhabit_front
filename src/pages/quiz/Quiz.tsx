import { useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "../../assets/back.png";
import * as S from "./Quiz.style";

export default function Quiz() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const correctAnswer = 0; //

  const handleChoice = (index: number) => {
    if (selected !== null) return; // 이미 선택했다면 다시 클릭 불가
    setSelected(index);
    setIsCorrect(index === correctAnswer);
  };

  const choices = ["① 연체하지 않기", "② 카드 많이 만들기", "③ 대출 자주 받기"];

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
            <S.PerQuiz>
              <S.QuizTitle>
                Q. 신용점수를 올리려면 어떻게 해야 할까요?
              </S.QuizTitle>
              <S.QuizChoice>
                {choices.map((choice, index) => (
                  <S.PerChoice
                    key={index}
                    onClick={() => handleChoice(index)}
                    selected={selected === index}
                    correct={isCorrect && index === correctAnswer}
                    wrong={
                      selected === index &&
                      isCorrect === false &&
                      index !== correctAnswer
                    }
                    showAnswer={isCorrect === false}
                    isAnswer={index === correctAnswer}
                  >
                    {choice}
                  </S.PerChoice>
                ))}
              </S.QuizChoice>
            </S.PerQuiz>
          </S.ContentBox>
        </S.N_Section>

        <S.N_Section>
          퀴즈 모아보기
          <S.ContentBox1 />
        </S.N_Section>
      </S.RemindingSection>
    </>
  );
}
