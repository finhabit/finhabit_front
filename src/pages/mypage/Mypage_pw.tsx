import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './Mypage_pw.style';

import { updatePassword } from '@/api/auth.api';

import closeIcon from '@/assets/close.svg';
import eye from '@/assets/eye.svg';

const PW_PLACEHOLDER = '숫자, 영문, 특수문자 8-16자 입력';

export default function MypagePw() {
  const nav = useNavigate();

  const [currentPw, setCurrentPw] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const isValid = useMemo(() => {
    const lenOk = pw.length >= 8 && pw.length <= 16;
    const hasNum = /\d/.test(pw);
    const hasEng = /[A-Za-z]/.test(pw);
    const hasSpec = /[^A-Za-z0-9]/.test(pw);
    return lenOk && hasNum && hasEng && hasSpec;
  }, [pw]);

  const same = pw.length > 0 && pw === pw2;
  const canSubmit = currentPw.length > 0 && isValid && same;

  const onSubmit = async () => {
    if (!canSubmit) return;

    try {
      await updatePassword({
        currentPassword: currentPw,
        newPassword: pw,
        newPasswordConfirm: pw2,
      });

      alert('비밀번호가 성공적으로 변경되었습니다.');
      nav(-1);
    } catch (error: any) {
      console.error('비밀번호 변경 실패:', error);
      if (error.response?.status === 400) {
        alert('현재 비밀번호가 일치하지 않거나 입력값이 올바르지 않습니다.');
      } else {
        alert('비밀번호 변경 중 오류가 발생했습니다.');
      }
    }
  };

  const handleCurrentPwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPw(e.target.value);
  };

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const handlePw2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw2(e.target.value);
  };

  return (
    <S.Page>
      <S.HeaderRow>
        <S.CloseBtn aria-label="닫기" onClick={() => nav(-1)}>
          <img src={closeIcon} alt="" />
        </S.CloseBtn>
      </S.HeaderRow>
      <S.HeaderSpacer />

      <S.SubtitleWrap>
        <S.Title>비밀번호 변경</S.Title>
        <S.Subtitle>안전한 정보 보호를 위해 비밀번호를 변경해 주세요.</S.Subtitle>
      </S.SubtitleWrap>

      <S.Field>
        <S.Label htmlFor="currentPw">현재 비밀번호</S.Label>
        <S.InputWrap>
          <S.Input
            id="currentPw"
            placeholder="현재 비밀번호를 입력해주세요"
            type={showCurrent ? 'text' : 'password'}
            value={currentPw}
            onChange={handleCurrentPwChange}
            autoComplete="current-password"
          />
          <S.EyeBtn
            aria-label={showCurrent ? '비밀번호 숨기기' : '비밀번호 보기'}
            onClick={() => setShowCurrent((v) => !v)}>
            <img src={eye} alt="" />
          </S.EyeBtn>
        </S.InputWrap>
      </S.Field>

      <S.Field>
        <S.Label htmlFor="pw1">새 비밀번호</S.Label>
        <S.InputWrap>
          <S.Input
            id="pw1"
            placeholder={PW_PLACEHOLDER}
            type={show1 ? 'text' : 'password'}
            value={pw}
            onChange={handlePwChange}
            autoComplete="new-password"
          />
          <S.EyeBtn aria-label={show1 ? '비밀번호 숨기기' : '비밀번호 보기'} onClick={() => setShow1((v) => !v)}>
            <img src={eye} alt="" />
          </S.EyeBtn>
        </S.InputWrap>
        {!isValid && pw.length > 0 && <S.Help>영문/숫자/특수문자 포함 8~16자로 입력해 주세요.</S.Help>}
      </S.Field>

      <S.Field>
        <S.Label htmlFor="pw2">새 비밀번호 확인</S.Label>
        <S.InputWrap>
          <S.Input
            id="pw2"
            placeholder="새 비밀번호 확인"
            type={show2 ? 'text' : 'password'}
            value={pw2}
            onChange={handlePw2Change}
            autoComplete="new-password"
          />
          <S.EyeBtn aria-label={show2 ? '비밀번호 숨기기' : '비밀번호 보기'} onClick={() => setShow2((v) => !v)}>
            <img src={eye} alt="" />
          </S.EyeBtn>
        </S.InputWrap>
        {pw2.length > 0 && !same && <S.Help>비밀번호가 일치하지 않습니다.</S.Help>}
      </S.Field>

      <S.BottomBar>
        <S.SubmitBtn disabled={!canSubmit} onClick={onSubmit}>
          비밀번호 변경 완료
        </S.SubmitBtn>
      </S.BottomBar>
    </S.Page>
  );
}
