import { useState, useEffect, useRef } from 'react';
import type { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './Mypage.style';

import BottomNav from '@/components/BottomNav';
import ComingSoon from '@/components/ComingSoon';

import chevronRight from '@/assets/chevronRight.svg';
import close2Icon from '@/assets/close2.svg';

import { getUserProfile, updateUserProfile, withdrawUser } from '@/api/auth.api';
import type { UserProfile } from '@/api/auth.api';
type OverlayType = 'comingSoon' | 'withdraw' | 'logout' | null;

export default function Mypage() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<UserProfile>({
    nickname: '',
    email: '',
    level: 0,
    maskedPassword: '****',
  });

  const [tempInput, setTempInput] = useState('');
  const [isNickModalOpen, setIsNickModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [overlayType, setOverlayType] = useState<OverlayType>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const data = await getUserProfile();

      setUserInfo(data);
      localStorage.setItem('userProfile', JSON.stringify(data));
    } catch (error) {
      console.error('프로필 로딩 실패:', error);
    }
  };

  const openNickModal = () => {
    setTempInput(userInfo.nickname);
    setIsNickModalOpen(true);
  };

  const saveNickname = async () => {
    const next = tempInput.trim();
    if (!next) return;

    try {
      await updateUserProfile({ nickname: next });
      setUserInfo((prev) => ({ ...prev, nickname: next }));
      setIsNickModalOpen(false);
      fetchUserData();
    } catch (error) {
      console.error('닉네임 수정 실패:', error);
      alert('닉네임 수정 중 오류가 발생했습니다.');
    }
  };

  const openEmailModal = () => {
    setTempInput(userInfo.email);
    setIsEmailModalOpen(true);
  };

  const saveEmail = async () => {
    const next = tempInput.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (next && emailRegex.test(next)) {
      try {
        await updateUserProfile({ email: next });
        setUserInfo((prev) => ({ ...prev, email: next }));
        setIsEmailModalOpen(false);
        fetchUserData();
      } catch (error) {
        console.error('이메일 수정 실패:', error);
        alert('이메일 수정 중 오류가 발생했습니다. (이미 존재하는 이메일 등)');
      }
    } else {
      alert('올바른 이메일 형식을 입력해주세요. (예: example@email.com)');
    }
  };

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
  const handleNickKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    handleKeyDown(e, saveNickname);
  };

  const handleEmailKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    handleKeyDown(e, saveEmail);
  };

  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const openComingSoon = () => setOverlayType('comingSoon');
  const openWithdraw = () => setOverlayType('withdraw');
  const openLogout = () => setOverlayType('logout');
  const closeOverlay = () => setOverlayType(null);

  const handleConfirmAction = async () => {
    try {
      if (overlayType === 'logout') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userProfile');
        alert('로그아웃 되었습니다.');
        navigate('/');
      } else if (overlayType === 'withdraw') {
        await withdrawUser();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userProfile');
        alert('회원 탈퇴가 완료되었습니다.');
        navigate('/');
      }
    } catch (error) {
      console.error('요청 실패:', error);
      alert('요청 처리 중 오류가 발생했습니다.');
    } finally {
      closeOverlay();
    }
  };

  useEffect(() => {
    if (isNickModalOpen || isEmailModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isNickModalOpen, isEmailModalOpen]);

  return (
    <S.Page>
      <S.Header>
        <S.Title>마이페이지</S.Title>
        <S.IconButton aria-label="설정" onClick={openComingSoon}></S.IconButton>
      </S.Header>

      <S.ItemSection>
        <S.ItemRow onClick={openNickModal} style={{ cursor: 'pointer' }}>
          <S.LeftCol>
            <S.Label>닉네임</S.Label>
            <S.Value>{userInfo.nickname || '로딩 중...'}</S.Value>
          </S.LeftCol>
          <S.RightCol>
            <img src={chevronRight} alt="" />
          </S.RightCol>
        </S.ItemRow>
        <S.Divider />
      </S.ItemSection>

      <S.ItemSection>
        <S.ItemRow onClick={openEmailModal} style={{ cursor: 'pointer' }}>
          <S.LeftCol>
            <S.Label>이메일</S.Label>
            <S.Value>{userInfo.email || '로딩 중...'}</S.Value>
          </S.LeftCol>
          <S.RightCol>
            <img src={chevronRight} alt="" />
          </S.RightCol>
        </S.ItemRow>
        <S.Divider />
      </S.ItemSection>

      <S.ItemSection>
        <S.ItemRow>
          <S.LeftCol>
            <S.Label>비밀번호</S.Label>
            <S.Value>{userInfo.maskedPassword || '********'}</S.Value>
          </S.LeftCol>
          <S.RightCol onClick={() => navigate('/mypage/pw')}>
            <img src={chevronRight} alt="" />
          </S.RightCol>
        </S.ItemRow>
        <S.Divider />
      </S.ItemSection>

      <S.ItemSection>
        <S.SectionTitle onClick={openComingSoon}>성취 현황</S.SectionTitle>
        <S.Divider />
      </S.ItemSection>

      <S.FooterActions>
        <S.TextButton type="button" onClick={openWithdraw}>
          회원탈퇴
        </S.TextButton>
        <S.TextButton type="button" onClick={openLogout}>
          로그아웃
        </S.TextButton>
      </S.FooterActions>

      <BottomNav />

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
                onKeyDown={handleNickKeyDown}
                placeholder="닉네임을 입력하세요"
                maxLength={20}
              />
            </S.ModalContent>
          </S.EditModalSheet>
        </S.ModalOverlay>
      )}

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
                onKeyDown={handleEmailKeyDown}
                placeholder="이메일 형식을 맞추어 기입해 주세요"
                maxLength={50}
              />
            </S.ModalContent>
          </S.EditModalSheet>
        </S.ModalOverlay>
      )}

      {overlayType === 'comingSoon' && <ComingSoon onClick={closeOverlay} />}

      {(overlayType === 'withdraw' || overlayType === 'logout') && (
        <S.PopupOverlay onClick={closeOverlay}>
          <S.ConfirmPopup onClick={handleContentClick}>
            <S.PopupText>{overlayType === 'withdraw' ? '탈퇴하시겠습니까?' : '로그아웃하시겠습니까?'}</S.PopupText>
            <S.PopupButtonGroup>
              <S.PopupYesButton onClick={handleConfirmAction}>예</S.PopupYesButton>
              <S.PopupNoButton onClick={closeOverlay}>아니오</S.PopupNoButton>
            </S.PopupButtonGroup>
          </S.ConfirmPopup>
        </S.PopupOverlay>
      )}
    </S.Page>
  );
}
