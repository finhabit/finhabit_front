import { useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Login.style";

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    // 비밀번호 검증 함수
    const isPasswordValid = (password: string) => {
        const hasMinLength = password.length >= 8;        // 8자 이상
        const hasLetter = /[A-Za-z]/.test(password);      // 영문 포함
        const hasNumber = /[0-9]/.test(password);         // 숫자 포함
        return hasMinLength && hasLetter && hasNumber;
    };

    const isFormValid = id.trim() !== "" && isPasswordValid(password);

    const handleLogin = () => {
        if (!isFormValid) return; // 기준 충족 안 하면 막기

        // TODO: 로그인 로직
        const isSuccess = true; // 실제론 API 응답 결과로 판단

        if (isSuccess) {
            navigate("/leveltest"); // 레벨테스트 페이지로 이동
        } else {
            alert("아이디 또는 비밀번호를 확인해주세요.");
        }
    };

    const handleSignup = () => {
        navigate("/signup");
    };

    const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <S.Container>
            <S.Content>
                <S.Title>아이디로 로그인</S.Title>

                <S.InputWrapper>
                    <S.Input
                        type="text"
                        placeholder="아이디 입력"
                        value={id}
                        onChange={handleIdChange}
                    />
                </S.InputWrapper>

                <S.InputWrapper style={{ marginTop: "12px" }}>
                    <S.Input
                        type="password"
                        placeholder="비밀번호 입력"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </S.InputWrapper>

                <S.LoginButton
                    onClick={handleLogin}
                    disabled={!isFormValid}
                    $active={isFormValid}
                >
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
