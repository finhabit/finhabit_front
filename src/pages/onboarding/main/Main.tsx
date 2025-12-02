import { useNavigate } from "react-router-dom";
import MainLogo from "@/assets/main.svg"; // main.svg 경로는 프로젝트에 맞게 수정
import * as S from "./Main.style";

const Main: React.FC = () => {
    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate("/signup");
    };

    const handleLoginClick = () => {
        navigate("/login");
    };

    return (
        <S.Container>
            <S.Content>
                <S.LogoImg src={MainLogo} alt="Finhabit 메인 로고" />

                <S.StartButton onClick={handleStartClick}>
                    Finhabit 시작하기
                </S.StartButton>

                <S.LoginArea>
                    <S.TextRow>
                        <S.QuestionText>이미 계정이 있으신가요?</S.QuestionText>
                        <S.LoginButtonText onClick={handleLoginClick}>
                            로그인하기
                        </S.LoginButtonText>

                    </S.TextRow>

                </S.LoginArea>
            </S.Content>
        </S.Container>
    );
};

export default Main;
