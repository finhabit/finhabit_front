import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import * as S from "./Signup.style";

const Signup: React.FC = () => {
    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    // 비밀번호 기준: 8~16자 + 영문 + 숫자 + 특수문자
    const isPasswordValid = (pw: string) => {
        const lenOk = pw.length >= 8 && pw.length <= 16;
        const hasNum = /\d/.test(pw);
        const hasEng = /[A-Za-z]/.test(pw);
        const hasSpec = /[^A-Za-z0-9]/.test(pw);
        return lenOk && hasNum && hasEng && hasSpec;
    };

    const isFormValid =
        userId.trim() !== "" &&
        email.trim() !== "" &&
        nickname.trim() !== "" &&
        password.trim() !== "" &&
        passwordConfirm.trim() !== "" &&
        isPasswordValid(password) &&
        password === passwordConfirm;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        // ✅ 회원가입 정보 LocalStorage에 저장 (Mypage와 연동)
        const newUserProfile = {
            nickname: nickname,
            email: email,
            password: password,
        };

        localStorage.setItem("userProfile", JSON.stringify(newUserProfile));

        alert("회원가입이 완료되었습니다.");


        navigate("/leveltest");
    };

    const handleUserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handlePasswordConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(e.target.value);
    };

    return (
        <S.Container>
            <S.Content onSubmit={handleSubmit}>
                <S.Title>회원가입</S.Title>

                <S.InputsWrapper>
                    <S.InputWrapper>
                        <S.Input
                            type="text"
                            placeholder="아이디 입력"
                            value={userId}
                            onChange={handleUserIdChange}
                        />
                    </S.InputWrapper>

                    <S.InputWrapper>
                        <S.Input
                            type="email"
                            placeholder="이메일 입력"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </S.InputWrapper>

                    <S.InputWrapper>
                        <S.Input
                            type="text"
                            placeholder="닉네임 입력"
                            value={nickname}
                            onChange={handleNicknameChange}
                        />
                    </S.InputWrapper>

                    <S.InputWrapper>
                        <S.Input
                            type="password"
                            placeholder="비밀번호 입력"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </S.InputWrapper>

                    <S.InputWrapper>
                        <S.Input
                            type="password"
                            placeholder="비밀번호 확인"
                            value={passwordConfirm}
                            onChange={handlePasswordConfirmChange}
                        />
                    </S.InputWrapper>
                </S.InputsWrapper>

                <S.SignupButton type="submit" disabled={!isFormValid} $active={isFormValid}>
                    회원가입
                </S.SignupButton>
            </S.Content>
        </S.Container>
    );
};

export default Signup;