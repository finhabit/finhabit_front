import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import back from '@/assets/back.svg';
import filter from '@/assets/filterblack.svg';
import ComingSoon from '@/components/ComingSoon';
import * as S from './Search.style';

export default function Search() {
  const navigate = useNavigate();

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const openOverlay = () => {
    setIsOverlayOpen(true);
  };
  const closeOverlay = () => {
    setIsOverlayOpen(false);
  };

  return (
    <>
      <S.UpLine>
        <S.Icon src={back} alt="뒤로가기" onClick={() => navigate(-1)} />
        검색
        <S.RightIcon src={filter} alt="필터" onClick={openOverlay} />
      </S.UpLine>

      <S.Container>
        <S.SearchInput placeholder="찾고 싶은 내용을 입력하세요" />

        <S.KeywordWrap>
          <S.Keyword onClick={openOverlay}>#미션 보상</S.Keyword>
          <S.Keyword onClick={openOverlay}>#쿠폰함</S.Keyword>
          <S.Keyword onClick={openOverlay}>#친구초대</S.Keyword>
        </S.KeywordWrap>
      </S.Container>
      {isOverlayOpen && <ComingSoon onClick={closeOverlay} />}
    </>
  );
}
