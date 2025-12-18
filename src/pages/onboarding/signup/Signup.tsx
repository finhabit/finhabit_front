import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './Signup.style';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const isEmailValid = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isPasswordValid = (pw: string) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_~.-])[a-zA-Z0-9!@#$%^&*?_~.-]{8,16}$/;
    return regex.test(pw);
  };

  const isNicknameLengthValid = nickname.length <= 15;
  const isNicknameValid = nickname.trim() !== '' && isNicknameLengthValid;

  const isFormValid =
    isEmailValid(email) && isNicknameValid && isPasswordValid(password) && password === passwordConfirm;

  const handleNextClick = () => {
    console.log('버튼 클릭됨! 현재 상태:', {
      emailValid: isEmailValid(email),
      nicknameValid: isNicknameValid,
      passwordValid: isPasswordValid(password),
      passwordMatch: password === passwordConfirm,
      isFormValid: isFormValid,
    });

    if (!isFormValid) {
      alert('입력 정보를 다시 확인해주세요.');
      return;
    }

    navigate('/leveltest', {
      state: {
        signupData: {
          email,
          nickname,
          password,
          passwordConfirm,
        },
      },
    });
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
      <S.Content as="div">
        <S.Title>회원가입</S.Title>

        <S.InputsWrapper>
          <S.InputWrapper>
            <S.Input
              type="email"
              placeholder="이메일 입력 (예: user@example.com)"
              value={email}
              onChange={handleEmailChange}
            />
          </S.InputWrapper>
          {email.length > 0 && !isEmailValid(email) && (
            <S.ErrorMessage>올바른 이메일 형식을 입력해주세요.</S.ErrorMessage>
          )}

          <S.InputWrapper>
            <S.Input
              type="text"
              placeholder="닉네임 입력 (최대 15자)"
              value={nickname}
              onChange={handleNicknameChange}
            />
          </S.InputWrapper>
          {!isNicknameLengthValid && <S.ErrorMessage>닉네임은 최대 15자까지 입력 가능합니다.</S.ErrorMessage>}

          <S.InputWrapper>
            <S.Input
              type="password"
              placeholder="비밀번호 (8~16자, 영문/숫자/특수문자 포함)"
              value={password}
              onChange={handlePasswordChange}
            />
          </S.InputWrapper>
          {password && !isPasswordValid(password) && (
            <S.ErrorMessage>8~16자, 영문/숫자/특수문자를 포함해야 합니다.</S.ErrorMessage>
          )}

          <S.InputWrapper>
            <S.Input
              type="password"
              placeholder="비밀번호 확인"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
            />
          </S.InputWrapper>
          {passwordConfirm && password !== passwordConfirm && (
            <S.ErrorMessage>비밀번호가 일치하지 않습니다.</S.ErrorMessage>
          )}
        </S.InputsWrapper>

        <S.SignupButton type="button" disabled={!isFormValid} $active={isFormValid} onClick={handleNextClick}>
          회원가입
        </S.SignupButton>
      </S.Content>
    </S.Container>
  );
};

export default Signup;
