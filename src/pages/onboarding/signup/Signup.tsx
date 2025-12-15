import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './Signup.style';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const isPasswordValid = (pw: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    return regex.test(pw);
  };

  const isNicknameLengthValid = nickname.length <= 15;
  const isNicknameValid = nickname.trim() !== '' && isNicknameLengthValid;

  const isFormValid =
    email.trim() !== '' && isNicknameValid && isPasswordValid(password) && password === passwordConfirm;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

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
      <S.Content onSubmit={handleSubmit}>
        <S.Title>회원가입</S.Title>

        <S.InputsWrapper>
          <S.InputWrapper>
            <S.Input type="email" placeholder="이메일 입력" value={email} onChange={handleEmailChange} />
          </S.InputWrapper>

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
            <S.ErrorMessage>8~16자, 영문/숫자/특수문자(@$!%*#?&)를 포함해야 합니다.</S.ErrorMessage>
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

        <S.SignupButton type="submit" disabled={!isFormValid} $active={isFormValid}>
          회원가입
        </S.SignupButton>
      </S.Content>
    </S.Container>
  );
};

export default Signup;
