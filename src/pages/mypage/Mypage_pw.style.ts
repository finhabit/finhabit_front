import styled from "styled-components";

export const SCREEN_MAX = 414;

/** 페이지 래퍼 */
export const Page = styled.main`
  margin: 0 auto;
  width: 100%;
  max-width: ${SCREEN_MAX}px;
  min-height: 100dvh;
  background: #fff;
  box-sizing: border-box;
  padding: 29px;
  font-family: Pretendard;
`;

/** 상단: 닫기(X) + 타이틀 */
export const HeaderRow = styled.header`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

export const CloseBtn = styled.button`
  width: 28px;
  height: 28px;
  border: 0;
  background: none;
  display: grid;
  place-items: center;
  cursor: pointer;

  & > img {
    width: 18px;
    height: 18px;
    display: block;
  }
`;

/** 타이틀 / 서브타이틀 */
export const Title = styled.h1`
  margin: 0;
  color: #2B2B27;
  text-align: center;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  flex: 1; /* 가운데 정렬 */
`;

export const SubtitleWrap = styled.div`
  margin-top: 8px;
  margin-bottom: 24px;
`;

export const Subtitle1 = styled.p`
  margin: 0;
  color: #CCC;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const Subtitle2 = styled.p`
  margin: 6px 0 0 0;
  color: #7B7B7B;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

/** 입력 폼 */
export const Field = styled.div`
  margin-bottom: 16px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #2B2B27;
  font-size: 16px;
  font-weight: 600;
`;

export const InputWrap = styled.div`
  position: relative;
  width: 320px;
  height: 48px;
`;

export const Input = styled.input`
  width: 320px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #CCC;
  color: #2B2B27;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: center;               /* 요청사항 */
  box-sizing: border-box;
  padding: 0 44px;                  /* 우측 아이콘 공간 */
  &::placeholder {
    color: #CCC;
  }
`;

export const EyeBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border: 0;
  background: none;
  cursor: pointer;

  & > img {
    width: 18px;
    height: 18px;
    display: block;
  }
`;

/** 안내/오류 메시지 */
export const Help = styled.p`
  display: flex;
  width: 323px;
  height: 18px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  margin: 8px 0 0 0;
  font-size: 12px;
  color: #7B7B7B;
`;

/** 하단 고정 버튼 */
export const BottomBar = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 24px;
  width: 100%;
  max-width: ${SCREEN_MAX}px;
  display: flex;
  justify-content: center;
  padding: 0 24px;
  box-sizing: border-box;
`;

export const SubmitBtn = styled.button<{ disabled?: boolean }>`
  width: 320px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 10px;
  background: ${p => (p.disabled ? "#EDEDED" : "#DFE678")};
  color: ${p => (p.disabled ? "#A0A0A0" : "#2B2B27")};
  border: 0;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: ${p => (p.disabled ? "not-allowed" : "pointer")};
`;
