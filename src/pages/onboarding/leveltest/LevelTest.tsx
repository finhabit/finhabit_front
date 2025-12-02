import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LevelCard from "@/components/LevelCard";
import * as S from "./LevelTest.style";

import levellogo from "@/assets/levellogo.svg";

type Question = {
    id: number;
    title: string;
    options: string[];
    correctAnswer: number;
};

const QUESTIONS: Question[] = [
    {
        id: 1,
        title: "‘적금’과 ‘예금’의 차이를 알고 있나요?",
        options: ["같은 뜻이다", "적금은 일정 금액을 나눠서 낸다", "모르겠다"],
        correctAnswer: 1, // 정답은 "적금은 일정 금액을 나눠서 낸다"
    },
    {
        id: 2,
        title: "신용카드와 체크카드의 차이를 알고\n있나요?",
        options: ["후불 / 선불 차이", "같음", "모르겠다"],
        correctAnswer: 0, // 정답은 "후불 / 선불 차이"
    },
    {
        id: 3,
        title: "‘분산 투자’의 의미는?",
        options: ["한 종목에 집중 투자", "여러 종목에 나눠 투자", "모르겠다"],
        correctAnswer: 1, // 정답은 "여러 종목에 나눠 투자"
    },
    {
        id: 4,
        title: "보이스피싱을 예방하기 위한 가장 좋은\n방법은?",
        options: ["개인정보 공유 금지", "문자 링크 클릭", "모르겠다"],
        correctAnswer: 0, // 정답은 "개인정보 공유 금지"
    },
    {
        id: 5,
        title: "보험 가입의 목적은?",
        options: ["세금 절약", "위험 대비", "모르겠다"],
        correctAnswer: 1, // 정답은 "위험 대비"
    },
];

const LevelTest = () => {
    const navigate = useNavigate();

    const [answers, setAnswers] = useState<Record<number, number | null>>(() => {
        const initial: Record<number, number | null> = {};
        QUESTIONS.forEach((q) => {
            initial[q.id] = null;
        });
        return initial;
    });

    const [score, setScore] = useState<number>(0); // 정답률
    const [showPopup, setShowPopup] = useState<boolean>(false); // 팝업 상태

    const handleSelect = (questionId: number, optionIndex: number) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: optionIndex,
        }));
    };

    const allAnswered = QUESTIONS.every((q) => answers[q.id] !== null);

    const handleSubmit = () => {
        if (!allAnswered) return;

        // 정답률 계산 (정답 수 / 총 문제 수)
        const correctAnswers = QUESTIONS.filter(
            (q) => answers[q.id] === q.correctAnswer
        ).length;

        const calculatedScore = (correctAnswers / QUESTIONS.length) * 100;
        setScore(Math.round(calculatedScore)); // 정답률 업데이트

        // 팝업창 띄우기
        setShowPopup(true);
    };


    const handleStart = () => {
        navigate("/home");
    };

    return (
        <S.Container>
            <S.Content>
                <S.Title>금융 지식을 얼마나 아는지 확인하기!</S.Title>

                <S.QuestionList>
                    {QUESTIONS.map((q) => (
                        <LevelCard
                            key={q.id}
                            title={q.title}
                            options={q.options}
                            selectedIndex={answers[q.id]}
                            onSelect={(index: number) => handleSelect(q.id, index)}
                        />
                    ))}
                </S.QuestionList>

                <S.SubmitButton
                    type="button"
                    onClick={handleSubmit}
                    disabled={!allAnswered}
                    $active={allAnswered}
                >
                    제출하기
                </S.SubmitButton>
            </S.Content>

            {/* 팝업창 */}
            {showPopup && (
                <S.PopupOverlay>
                    <S.PopupContent>
                        <S.PopupText>
                            <S.PopupTitle>정답률 {score}%</S.PopupTitle>
                            <S.PopupMessage>
                                이제 투자와 자산관리까지 한 단계 더!
                            </S.PopupMessage>
                        </S.PopupText>
                        <S.PopupImage src={levellogo} alt="levellogo" />
                        <S.PopupButton onClick={handleStart}>
                            상급형 Finhabit 시작하기
                        </S.PopupButton>
                    </S.PopupContent>
                </S.PopupOverlay>
            )}
        </S.Container>
    );
};

export default LevelTest;
