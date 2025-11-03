import styled from "styled-components";

/** 공통 가이드 */
export const SCREEN_MAX = 414;        // 바텀네비와 동일
export const SIDE = 38;               // 좌우 패딩(피그마 38/37 근사)
export const CONTENT_MAX = SCREEN_MAX - SIDE * 2; // 338px

/** 페이지: 전체는 414 안에서 중앙정렬, 좌우 패딩은 내부에서 처리 */
export const Page = styled.main`
  margin: 0 auto;
  width: 100%;
  max-width: ${SCREEN_MAX}px;
  min-height: 100dvh;
  padding: 24px 0 110px;              /* 상단/하단만 */
  box-sizing: border-box;
  background: #fff;
  font-family: Pretendard, system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans",
    "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
`;

/** 상단 헤더 */
export const Header = styled.header`
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 31px;           /* 좌우 38px */
  position: relative;
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
  right: ${SIDE}px;                   /* 아이콘도 38px 정렬선에 맞춤 */
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

/** 콘텐츠 래퍼: 내부 여백을 38px로 고정 */
export const ContentWrap = styled.div`
  padding: 0 ${SIDE}px;
  display: flex;
  flex-direction: column;
  align-items: center;                /* 내부 라인 중앙 */
  gap: 14px;
`;

/** 리스트 영역 */
export const List = styled.section`
  width: 100%;
  max-width: ${CONTENT_MAX}px;        /* 338px */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ListRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0 12px;               /* 타이틀과의 간격 맞춤 */
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

  & > img {
    width: 6px;                       /* 피그마 작은 토글 화살표 */
    height: 12px;
    display: block;
  }
`;

/** 구분선: 폭은 자동(338px) */
export const Divider = styled.hr`
  width: 100%;
  height: 2px;
  background: #d9d9d9;
  border: 0;
  margin: 0;
`;

export const SectionTitle = styled.h2`
  width: 100%;
  margin: 16px 0 0;                   /* 타이틀 위 여백 살짝 키움 */
  color: #000;
  font-size: 18px;
  font-weight: 600;
  line-height: normal;
`;

/** 하단 텍스트 버튼들 */
export const FooterActions = styled.div`
  width: 100%;
  max-width: ${CONTENT_MAX}px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 53px;                           /* 회원탈퇴 ↔ 로그아웃 */
  margin-top: 10px;
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
