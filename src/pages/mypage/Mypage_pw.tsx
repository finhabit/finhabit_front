import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './Mypage_pw.style';

// 아이콘
import closeIcon from '@/assets/close.svg';
import eye from '@/assets/eye.svg';

const PW_PLACEHOLDER = '숫자, 영문, 특수문자 8-16자 입력';

export default function MypagePw() {
  const nav = useNavigate();

  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  // 비밀번호 규칙: 8~16자, 영문/숫자/특수문자 각 1개 이상
  const isValid = useMemo(() => {
    const lenOk = pw.length >= 8 && pw.length <= 16;
    const hasNum = /\d/.test(pw);
    const hasEng = /[A-Za-z]/.test(pw);
    const hasSpec = /[^A-Za-z0-9]/.test(pw);
    return lenOk && hasNum && hasEng && hasSpec;
  }, [pw]);

  const same = pw.length > 0 && pw === pw2;
  const canSubmit = isValid && same;

  const onSubmit = () => {
    if (!canSubmit) return;

    // ✅ [수정] 변경된 비밀번호를 LocalStorage에 저장하여 Mypage에 반영
    const savedData = localStorage.getItem('userProfile');
    let userInfo = {};

    if (savedData) {
      userInfo = JSON.parse(savedData);
    }

    // 비밀번호 업데이트
    const updatedUser = { ...userInfo, password: pw };
    localStorage.setItem('userProfile', JSON.stringify(updatedUser));

    // 성공 후 뒤로가기
    nav(-1);
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
        <S.Title>비밀번호 설정</S.Title>
        <S.Subtitle>비밀번호가 설정되어 있지 않습니다.</S.Subtitle>
        <S.Subtitle>비밀번호 설정 시 이메일을 통해 로그인할 수 있습니다.</S.Subtitle>
      </S.SubtitleWrap>

      {/* 비밀번호 */}
      <S.Field>
        <S.Label htmlFor="pw1">비밀번호</S.Label>
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

      {/* 비밀번호 확인 */}
      <S.Field>
        <S.Label htmlFor="pw2">비밀번호 확인</S.Label>
        <S.InputWrap>
          <S.Input
            id="pw2"
            placeholder="비밀번호 확인"
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
          비밀번호 설정 완료
        </S.SubmitBtn>
      </S.BottomBar>
    </S.Page>
  );
}