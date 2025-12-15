export interface TodayQuiz {
  quizId: number;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  isAnswered: boolean;
}

export interface QuizSubmitResult {
  quizId: number;
  isCorrect: boolean;
  selectedAnswer: number;
}

export interface TodayQuizExplanation {
  quizId: number;
  answer: number;
  explanation: string;
  isCorrect: boolean;
}

export interface QuizHistoryItem {
  quizId: number;
  attemptedDate: string;
  cardTitle: string;
  isCorrect: boolean;
}

export interface WeeklyQuizHistory {
  weekLabel: string;
  quizzes: QuizHistoryItem[];
}

export interface QuizListResponse {
  monthLabel: string;
  weeklyHistory: WeeklyQuizHistory[];
}
