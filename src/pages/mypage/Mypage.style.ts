import styled from 'styled-components';

export const SCREEN_MAX = 414;
export const LINE_MAX = 332;

export const Page = styled.main`
  margin: 0;
  width: 100%;
  max-width: ${SCREEN_MAX}px;
  min-height: 100dvh;
  padding: 55px 31px 31px 31px;
  box-sizing: border-box;
  background: #fff;
  font-family: Pretendard;
`;

/** 상단 헤더 */
export const Header = styled.header`
  position: relative;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  margin: 0;
  color: #000;
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  line-height: normal;
`;

export const IconButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;

  & > img {
    width: 24px;
    height: 24px;
    display: block;
  }
`;

/** 섹션 스타일 */
export const ItemSection = styled.section`
  width: ${LINE_MAX}px;
  margin: 0 auto;
`;

export const ItemRow = styled.div`
  width: ${LINE_MAX}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 21px 0;
  box-sizing: border-box;
`;

export const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
`;

export const Label = styled.span`
  color: #000;
  font-size: 18px;
  font-weight: 600;
  line-height: normal;
`;

export const Value = styled.span`
  color: #7b7b7b;
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
`;

export const RightCol = styled.div`
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  cursor: pointer;

  & > img {
    width: 6px;
    height: 12px;
    display: block;
  }
`;

export const Divider = styled.hr`
  width: ${LINE_MAX}px;
  height: 2px;
  background: #d9d9d9;
  border: 0;
  margin: 0;
`;

/** 성취 현황 스타일 */
export const SectionTitle = styled.h2`
  width: ${LINE_MAX}px;
  color: #000;
  font-size: 18px;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  text-align: left;
  margin-top: 21px;
  margin-bottom: 21px;
`;

export const FooterActions = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 124px;
  width: ${LINE_MAX}px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 53px;
`;

export const TextButton = styled.button`
  background: none;
  border: 0;
  padding: 8px 0;
  cursor: pointer;

  color: #5c5c5c;
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
`;

/* ------------------------------------------- */
/* 모달 (오버레이 공통) */
/* ------------------------------------------- */
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(123, 123, 123, 0.45);
  display: flex;
  align-items: flex-end; /* Bottom Sheet용 */
  justify-content: center;
  z-index: 1000;
`;

/* 이메일/닉네임 수정용 Bottom Sheet */
export const EditModalSheet = styled.div`
  width: 403px;
  height: 499px;
  flex-shrink: 0;
  border-radius: 31px 31px 0 0;
  background: #fff;
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  line-height: normal;

  display: flex;
  flex-direction: column;
  padding: 18px 18px 24px 18px;
  box-sizing: border-box;
`;

export const ModalHeader = styled.div`
  position: relative;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

export const ModalCloseBtn = styled.button`
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  background: none;
  border: 0;
  cursor: pointer;

  & > img {
    width: 19px;
    height: 19px;
    display: block;
  }
`;

export const ModalContent = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 60px;
`;

export const Input = styled.input`
  width: 332px;
  height: 70px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid #5c5c5c;
  
  
  color: #000; 
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
  outline: none;

  &::placeholder {
    color: #ccc;
    text-align: center;
    font-size: 17px;
  }
`;

/* ------------------------------------------- */
/* 팝업 (로그아웃 / 탈퇴용) */
/* ------------------------------------------- */
export const PopupOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(123, 123, 123, 0.45);
  display: flex;
  align-items: center; 
  justify-content: center;
  z-index: 1001;
`;

export const ConfirmPopup = styled.div`
  width: 358px;
  height: 186px;
  flex-shrink: 0;
  border-radius: 70px;
  background: #FFF;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  box-sizing: border-box;
`;

export const PopupText = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 22px;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 31px;
`;

export const PopupButtonGroup = styled.div`
  display: flex;
  gap: 24px;
`;

const BasePopupButton = styled.button`
  display: flex;
  width: 133px;
  height: 69px;
  justify-content: center;
  align-items: center;
  border-radius: 70px;
  border: 0;
  cursor: pointer;
  
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 25px;
  font-weight: 600;
  line-height: normal;
`;

export const PopupYesButton = styled(BasePopupButton)`
  background: #DFE678;
`;

export const PopupNoButton = styled(BasePopupButton)`
  background: #D9D9D9;
`;