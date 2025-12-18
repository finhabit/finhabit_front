import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/api/auth.api';

import * as S from './Login.style';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const isFormValid = email.trim() !== '' && password.length >= 1;

  const handleLogin = async () => {
    if (!isFormValid || loading) return;

    try {
      setLoading(true);

      const data = await login(email, password);

      localStorage.setItem('accessToken', data.accessToken);

      navigate('/home');
    } catch (err: any) {
      console.error('로그인 실패:', err);
      alert('이메일 또는 비밀번호를 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <S.Container>
      <S.Content>
        <S.Title>이메일로 로그인</S.Title>

        <S.InputWrapper>
          <S.Input type="text" placeholder="이메일 입력" value={email} onChange={handleEmailChange} />{' '}
        </S.InputWrapper>

        <S.InputWrapper style={{ marginTop: '12px' }}>
          <S.Input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={handleKeyDown}
          />
        </S.InputWrapper>

        <S.LoginButton onClick={handleLogin} disabled={!isFormValid || loading} $active={isFormValid}>
          {loading ? '로그인 중...' : '로그인'}
        </S.LoginButton>

        <S.HelperRow>
          <S.SignUpText onClick={() => navigate('/signup')}>회원가입</S.SignUpText>
        </S.HelperRow>
      </S.Content>
    </S.Container>
  );
};

export default Login;
