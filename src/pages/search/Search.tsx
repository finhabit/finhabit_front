import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import back from '@/assets/back.svg';
import filter from '@/assets/filterblack.svg';
import ComingSoon from '@/components/ComingSoon';
import * as S from './Search.style';

const PAGE_DATA = [
  {
    id: 1,
    title: '미션',
    desc: '매일매일 미션을 수행하고 보상을 받아보세요.',
    path: '/mission',
    keywords: ['미션', 'mission', '과제', 'Todo', '해야할 일'],
  },
  {
    id: 2,
    title: '가계부 쓰기',
    desc: '수입과 지출을 꼼꼼하게 관리하세요.',
    path: '/ledger',
    keywords: ['가계부', '지출', '수입', '돈', '예산', 'ledger', 'money', '돈', '재정', '용돈', '월급', '탕진'],
  },
  {
    id: 3,
    title: '금융 퀴즈',
    desc: '금융 상식을 퀴즈로 재미있게 풀어보세요.',
    path: '/quiz',
    keywords: ['퀴즈', '문제', '지식', '공부', 'quiz', 'test', '점수'],
  },
  {
    id: 4,
    title: '금융 지식 (오늘의 지식)',
    desc: '어려운 금융 용어와 상식을 쉽게 배워요.',
    path: '/finance',
    keywords: ['지식', '공부', '금융', 'finance', '오늘', '상식'],
  },
  {
    id: 5,
    title: '마이페이지',
    desc: '내 정보와 설정을 관리합니다.',
    path: '/mypage',
    keywords: ['마이', '내정보', '설정', '프로필', 'mypage', 'my', '로그인', '로그아웃', '회원탈퇴', '정보변경'],
  },
  {
    id: 6,
    title: '알림 센터',
    desc: '놓친 알림들을 확인해보세요.',
    path: '/notification',
    keywords: ['알림', '메시지', 'news', 'notice', '무음', '끄기'],
  },
];

export default function Search() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const openOverlay = () => setIsOverlayOpen(true);
  const closeOverlay = () => setIsOverlayOpen(false);

  const searchResults = useMemo(() => {
    if (searchTerm.trim() === '') return [];

    const lowerTerm = searchTerm.toLowerCase().replace(/\s+/g, '');

    return PAGE_DATA.filter((page) => {
      const titleMatch = page.title.toLowerCase().includes(lowerTerm);
      const keywordMatch = page.keywords.some((key) => key.toLowerCase().includes(lowerTerm));
      return titleMatch || keywordMatch;
    });
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <S.UpLine>
        <S.Icon src={back} alt="뒤로가기" onClick={() => navigate(-1)} />
        검색
        <S.RightIcon src={filter} alt="필터" onClick={openOverlay} />
      </S.UpLine>

      <S.Container>
        <S.SearchInput
          placeholder="찾고 싶은 내용을 입력하세요"
          value={searchTerm}
          onChange={handleInputChange}
          autoFocus
        />

        {searchTerm === '' && (
          <S.KeywordWrap>
            <S.Keyword onClick={openOverlay}>#미션 보상</S.Keyword>
            <S.Keyword onClick={openOverlay}>#쿠폰함</S.Keyword>
            <S.Keyword onClick={openOverlay}>#친구초대</S.Keyword>
          </S.KeywordWrap>
        )}

        {searchTerm !== '' && (
          <>
            {searchResults.length > 0 ? (
              <S.ResultList>
                {searchResults.map((item) => (
                  <S.ResultItem key={item.id} onClick={() => navigate(item.path)}>
                    <S.ResultTitle>{item.title}</S.ResultTitle>
                    <S.ResultPath>{item.desc}</S.ResultPath>
                  </S.ResultItem>
                ))}
              </S.ResultList>
            ) : (
              <S.NoResult>'{searchTerm}'에 대한 검색 결과가 없습니다.</S.NoResult>
            )}
          </>
        )}
      </S.Container>

      {isOverlayOpen && <ComingSoon onClick={closeOverlay} />}
    </>
  );
}
