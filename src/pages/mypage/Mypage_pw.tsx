import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Page,
  HeaderRow,
  HeaderSpacer,
  CloseBtn,
  Title,
  SubtitleWrap,
  Subtitle,
  Field,
  Label,
  InputWrap,
  Input,
  EyeBtn,
  Help,
  BottomBar,
  SubmitBtn,
} from './Mypage_pw.style';

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
    // TODO: API 요청으로 비밀번호 저장
    // 성공 후 뒤로가기 또는 완료 화면
    nav(-1);
  };

  return (
    <Page>
      <HeaderRow>
        <CloseBtn aria-label="닫기" onClick={() => nav(-1)}>
          <img src={closeIcon} alt="" />
        </CloseBtn>
      </HeaderRow>
      <HeaderSpacer />

      <SubtitleWrap>
        <Title>비밀번호 설정</Title>
        <Subtitle>비밀번호가 설정되어 있지 않습니다.</Subtitle>
        <Subtitle>비밀번호 설정 시 이메일을 통해 로그인할 수 있습니다.</Subtitle>
      </SubtitleWrap>

      {/* 비밀번호 */}
      <Field>
        <Label htmlFor="pw1">비밀번호</Label>
        <InputWrap>
          <Input
            id="pw1"
            placeholder={PW_PLACEHOLDER}
            type={show1 ? 'text' : 'password'}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            autoComplete="new-password"
          />
          <EyeBtn aria-label={show1 ? '비밀번호 숨기기' : '비밀번호 보기'} onClick={() => setShow1((v) => !v)}>
            <img src={eye} alt="" />
          </EyeBtn>
        </InputWrap>
        {!isValid && pw.length > 0 && <Help>영문/숫자/특수문자 포함 8~16자로 입력해 주세요.</Help>}
      </Field>

      {/* 비밀번호 확인 */}
      <Field>
        <Label htmlFor="pw2">비밀번호 확인</Label>
        <InputWrap>
          <Input
            id="pw2"
            placeholder="비밀번호 확인"
            type={show2 ? 'text' : 'password'}
            value={pw2}
            onChange={(e) => setPw2(e.target.value)}
            autoComplete="new-password"
          />
          <EyeBtn aria-label={show2 ? '비밀번호 숨기기' : '비밀번호 보기'} onClick={() => setShow2((v) => !v)}>
            <img src={eye} alt="" />
          </EyeBtn>
        </InputWrap>
        {pw2.length > 0 && !same && <Help>비밀번호가 일치하지 않습니다.</Help>}
      </Field>

      <BottomBar>
        <SubmitBtn disabled={!canSubmit} onClick={onSubmit}>
          비밀번호 설정 완료
        </SubmitBtn>
      </BottomBar>
    </Page>
  );
}
