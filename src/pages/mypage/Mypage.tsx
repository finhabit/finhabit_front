import { useState, useEffect, useRef } from 'react';
import type { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './Mypage.style';

import BottomNav from '@/components/BottomNav';
import ComingSoon from '@/components/ComingSoon';

// 아이콘
import chevronRight from '@/assets/chevronRight.svg';
import settingsIcon from '@/assets/settingsIcon.svg';
import close2Icon from '@/assets/close2.svg';

// 팝업 타입 정의
type OverlayType = 'comingSoon' | 'withdraw' | 'logout' | null;

// 초기 데이터
const INITIAL_USER = {
  nickname: '연짱이',
  email: 'rladusd@naver.com',
  password: 'b1234password',
};

export default function Mypage() {
  const navigate = useNavigate();

  // ✅ 상태 관리
  const [userInfo, setUserInfo] = useState(INITIAL_USER);

  // 수정용 임시 상태
  const [tempInput, setTempInput] = useState('');

  // 모달 상태
  const [isNickModalOpen, setIsNickModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 팝업/오버레이 상태
  const [overlayType, setOverlayType] = useState<OverlayType>(null);

  // ✅ 페이지 로드 시 로컬 스토리지 데이터 로드
  useEffect(() => {
    const savedData = localStorage.getItem('userProfile');
    if (savedData) {
      setUserInfo(JSON.parse(savedData));
    } else {
      localStorage.setItem('userProfile', JSON.stringify(INITIAL_USER));
    }
  }, []);

  // -----------------------
  // 헬퍼 함수: 데이터 저장
  // -----------------------
  const updateUserInfo = (key: string, value: string) => {
    const newUserInfo = { ...userInfo, [key]: value };
    setUserInfo(newUserInfo);
    localStorage.setItem('userProfile', JSON.stringify(newUserInfo));
  };

  // -----------------------
  // 핸들러: 닉네임
  // -----------------------
  const openNickModal = () => {
    setTempInput(userInfo.nickname);
    setIsNickModalOpen(true);
  };

  const saveNickname = () => {
    const next = tempInput.trim();
    if (next) {
      updateUserInfo('nickname', next);
      setIsNickModalOpen(false);
    }
  };

  // -----------------------
  // 핸들러: 이메일
  // -----------------------
  const openEmailModal = () => {
    setTempInput(userInfo.email);
    setIsEmailModalOpen(true);
  };

  const saveEmail = () => {
    const next = tempInput.trim();
    if (next && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next)) {
      updateUserInfo('email', next);
      setIsEmailModalOpen(false);
    } else {
      alert('올바른 이메일 형식을 입력해주세요.');
    }
  };

  // -----------------------
  // 공통 핸들러
  // -----------------------
  const closeModals = () => {
    setIsNickModalOpen(false);
    setIsEmailModalOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, action: () => void) => {
    if (e.key === 'Enter') action();
  };

  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  // -----------------------
  // 팝업 핸들러 (로그아웃/탈퇴)
  // -----------------------
  const openComingSoon = () => setOverlayType('comingSoon');
  const openWithdraw = () => setOverlayType('withdraw');
  const openLogout = () => setOverlayType('logout');
  const closeOverlay = () => setOverlayType(null);

  const handleConfirmAction = () => {
    navigate('/');
    closeOverlay();
  };

  // 모달 열릴 때 포커스
  useEffect(() => {
    if (isNickModalOpen || isEmailModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isNickModalOpen, isEmailModalOpen]);

  // ✅ 비밀번호 마스킹 처리 수정 (뒤 4자리만 ****)
  const getMaskedPassword = () => {
    const pw = userInfo.password;
    if (pw.length <= 4) return '****'; // 4자리 이하는 전부 마스킹
    // 전체 길이에서 뒤의 4자리를 제외한 앞부분 + ****
    return pw.slice(0, -4) + '****';
  };

  return (
    <S.Page>
      <S.Header>
        <S.Title>마이페이지</S.Title>
        <S.IconButton aria-label="설정" onClick={openComingSoon}>
          <img src={settingsIcon} alt="" />
        </S.IconButton>
      </S.Header>


      {/* 닉네임 */}
      <S.ItemSection>
        <S.ItemRow onClick={openNickModal} style={{ cursor: 'pointer' }}>
          <S.LeftCol>
            <S.Label>닉네임</S.Label>
            <S.Value>{userInfo.nickname}</S.Value>
          </S.LeftCol>
          <S.RightCol>
            <img src={chevronRight} alt="" />
          </S.RightCol>
        </S.ItemRow>
        <S.Divider />
      </S.ItemSection>

      {/* 이메일 */}
      <S.ItemSection>
        <S.ItemRow onClick={openEmailModal} style={{ cursor: 'pointer' }}>
          <S.LeftCol>
            <S.Label>이메일</S.Label>
            <S.Value>{userInfo.email}</S.Value>
          </S.LeftCol>
          <S.RightCol>
            <img src={chevronRight} alt="" />
          </S.RightCol>
        </S.ItemRow>
        <S.Divider />
      </S.ItemSection>

      {/* 비밀번호 */}
      <S.ItemSection>
        <S.ItemRow>
          <S.LeftCol>
            <S.Label>비밀번호</S.Label>
            <S.Value>{getMaskedPassword()}</S.Value>
          </S.LeftCol>
          <S.RightCol onClick={() => navigate('/mypage/pw')}>
            <img src={chevronRight} alt="" />
          </S.RightCol>
        </S.ItemRow>
        <S.Divider />
      </S.ItemSection>

      {/* 성취 현황 */}
      <S.ItemSection>
        <S.SectionTitle onClick={openComingSoon}>성취 현황</S.SectionTitle>
        <S.Divider />
      </S.ItemSection>

      {/* 회원탈퇴/로그아웃 */}
      <S.FooterActions>
        <S.TextButton type="button" onClick={openWithdraw}>
          회원탈퇴
        </S.TextButton>
        <S.TextButton type="button" onClick={openLogout}>
          로그아웃
        </S.TextButton>
      </S.FooterActions>

      <BottomNav />

      {/* ✅ 1. 닉네임 수정 모달 */}
      {isNickModalOpen && (
        <S.ModalOverlay role="dialog" onClick={closeModals}>
          <S.EditModalSheet onClick={handleContentClick}>
            <S.ModalHeader>
              <S.ModalTitle>닉네임 수정</S.ModalTitle>
              <S.ModalCloseBtn aria-label="닫기" onClick={closeModals}>
                <img src={close2Icon} alt="" />
              </S.ModalCloseBtn>
            </S.ModalHeader>
            <S.ModalContent>
              <S.Input
                ref={inputRef}
                value={tempInput}
                onChange={handleChange}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, saveNickname)}
                placeholder="닉네임을 입력하세요"
                maxLength={20}
              />
            </S.ModalContent>
          </S.EditModalSheet>
        </S.ModalOverlay>
      )}

      {/* ✅ 2. 이메일 수정 모달 */}
      {isEmailModalOpen && (
        <S.ModalOverlay role="dialog" onClick={closeModals}>
          <S.EditModalSheet onClick={handleContentClick}>
            <S.ModalHeader>
              <S.ModalTitle>이메일 수정</S.ModalTitle>
              <S.ModalCloseBtn aria-label="닫기" onClick={closeModals}>
                <img src={close2Icon} alt="" />
              </S.ModalCloseBtn>
            </S.ModalHeader>
            <S.ModalContent>
              <S.Input
                ref={inputRef}
                value={tempInput}
                onChange={handleChange}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, saveEmail)}
                placeholder="이메일 형식을 맞추어 기입해 주세요"
                maxLength={50}
              />
            </S.ModalContent>
          </S.EditModalSheet>
        </S.ModalOverlay>
      )}

      {/* ✅ 3. ComingSoon */}
      {overlayType === 'comingSoon' && (
        <ComingSoon onClick={closeOverlay} />
      )}

      {/* ✅ 4. 탈퇴/로그아웃 팝업 */}
      {(overlayType === 'withdraw' || overlayType === 'logout') && (
        <S.PopupOverlay onClick={closeOverlay}>
          <S.ConfirmPopup onClick={handleContentClick}>
            <S.PopupText>
              {overlayType === 'withdraw'
                ? '탈퇴하시겠습니까?'
                : '로그아웃하시겠습니까?'}
            </S.PopupText>
            <S.PopupButtonGroup>
              <S.PopupYesButton onClick={handleConfirmAction}>
                예
              </S.PopupYesButton>
              <S.PopupNoButton onClick={closeOverlay}>
                아니오
              </S.PopupNoButton>
            </S.PopupButtonGroup>
          </S.ConfirmPopup>
        </S.PopupOverlay>
      )}
    </S.Page>
  );
}