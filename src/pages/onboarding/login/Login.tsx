import { useNavigate } from "react-router-dom";
import * as S from "./Login.style";

const Login: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // TODO: 로그인 로직
        // 1. 로그인 요청 (예시)
        // const res = await loginApi({ id, password });

        // 2. 로그인 성공했으면
        const isSuccess = true; // 실제론 API 응답 결과로 판단

        if (isSuccess) {
            navigate("/leveltest"); // 레벨테스트 페이지로 이동
        } else {
            // 실패 처리 (에러 메시지 등)
            alert("아이디 또는 비밀번호를 확인해주세요.");
        }

    };

    const handleSignup = () => {
        navigate("/signup");
    };


    return (
        <S.Container>
            <S.Content>
                <S.Title>아이디로 로그인</S.Title>

                <S.InputWrapper>
                    <S.Input
                        type="text"
                        placeholder="아이디 입력"
                    />
                </S.InputWrapper>

                <S.InputWrapper style={{ marginTop: "12px" }}>
                    <S.Input
                        type="password"
                        placeholder="비밀번호 입력"
                    />
                </S.InputWrapper>

                <S.LoginButton onClick={handleLogin}>
                    로그인
                </S.LoginButton>

                <S.HelperRow>
                    <S.HelperText>아이디 찾기</S.HelperText>
                    <S.Divider />
                    <S.HelperText>비밀번호 찾기</S.HelperText>
                    <S.Divider />
                    <S.SignUpText onClick={handleSignup}>회원가입</S.SignUpText>
                </S.HelperRow>
            </S.Content>
        </S.Container>
    );
};

export default Login;
