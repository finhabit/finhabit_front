import styled from 'styled-components';

export const SCREEN_MAX = 414;
export const LINE_MAX = 332;

/** 페이지 */
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

export const FirstSectionSpacer = styled.div`
  height: 51px;
`;

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

export const SectionTitle = styled.h2`
  width: ${LINE_MAX}px;
  color: #000;
  font-size: 18px;
  font-weight: 600;
  line-height: normal;
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

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(123, 123, 123, 0.45);
  display: flex;
  align-items: flex-end; /* ✅ 스샷처럼 하단에서 올라오는 느낌 */
  justify-content: center;
  z-index: 1000;
`;

/** ✅ 시안 규격 반영: width 403, height 499, radius 31 */
export const ModalSheet = styled.div`
  width: 403px;
  height: 499px;
  flex-shrink: 0;
  border-radius: 31px 31px 0 0;
  background: #fff;
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  display: flex;
  flex-direction: column;
  padding: 18px 18px 24px 18px;
  box-sizing: border-box;
`;

export const ModalHeader = styled.div`
  position: relative;
  height: 32px; /* 헤더 높이 */
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

/** ✅ 인풋 규격 반영: width 332, height 70, radius 12, border #5C5C5C, 중앙정렬 */
export const NickInput = styled.input`
  width: 332px;
  height: 70px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid #5c5c5c;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  outline: none;

  &::placeholder {
    color: #bdbdbd;
  }
`;
