import styled from 'styled-components';

export const SCREEN_MAX = 414;

export const Page = styled.main`
  margin: 0 auto;
  width: 100%;
  max-width: ${SCREEN_MAX}px;
  min-height: 100dvh;
  background: #fff;
  box-sizing: border-box;
  padding: 29px;
`;

export const HeaderRow = styled.header`
  display: flex;
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
    width: 16px;
    height: 16px;
    display: block;
  }
`;
export const HeaderSpacer = styled.div`
  height: 31px;
`;

export const Title = styled.h1`
  margin: 0;
  color: #2b2b27;
  text-align: left;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
`;

export const SubtitleWrap = styled.div`
  margin-top: 8px;
  margin-bottom: 24px;
`;

export const Subtitle = styled.p`
  margin: 0;
  color: #ccc;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 1.4;
  white-space: nowrap;
  text-align: left;
`;

/** 입력 폼 */
export const Field = styled.div`
  margin-bottom: 33px;
  margin-top: 33px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #7b7b7b;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
`;

export const InputWrap = styled.div`
  position: relative;
  width: 100%;
  height: 48px;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #ccc;
  color: #2b2b27;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: left;
  box-sizing: border-box;
  padding: 10px;
  &::placeholder {
    color: #ccc;
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
  color: #7b7b7b;
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
  background: ${(p) => (p.disabled ? '#EDEDED' : '#DFE678')};
  color: ${(p) => (p.disabled ? '#A0A0A0' : '#2B2B27')};
  border: 0;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
`;
