import { useState } from 'react';
import * as S from './SetCategory.style';
import { useNavigate } from 'react-router-dom';

import arrow_left_alt from '@/assets/arrow_left_alt.svg';
import close from '@/assets/close.svg';
import categoryeat from '@/assets/categoryeat.svg';
import categorytran from '@/assets/categorytran.svg';
import categoryshopping from '@/assets/categoryshopping.svg';
import categoryrest from '@/assets/categoryrest.svg';
import categoryetc from '@/assets/etcbtn.svg';

export default function SetCategoryOutcome() {
  const navigate = useNavigate();
  const [desc, setDesc] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<'cash' | 'card' | 'etc' | null>(null);

  const categories = [
    { src: categoryeat, alt: '식비' },
    { src: categoryshopping, alt: '쇼핑' },
    { src: categoryrest, alt: '여가' },
    { src: categorytran, alt: '교통' },
    { src: categoryetc, alt: '기타' },
  ];

  const handleCategoryClick = (altText: string) => {
    if (selectedCategory === altText) {
      setSelectedCategory(null);
      setDesc('');
      return;
    }

    setSelectedCategory(altText);

    if (altText === '기타') {
      if (categories.some((c) => c.alt === desc && c.alt !== '기타')) {
        setDesc('');
      }
    } else {
      setDesc(altText);
    }
  };

  const handleMethodClick = (method: 'cash' | 'card' | 'etc') => {
    setSelectedMethod(method);
    navigate('/ledgercalendar');
  };

  return (
    <S.Container>
      <S.TopBar>
        <div>
          <S.Icon src={arrow_left_alt} alt="arrow" onClick={() => navigate(-1)} />
          <S.Amount>2,000원</S.Amount>
        </div>
        <S.Icon src={close} alt="close" onClick={() => navigate(-2)} />
      </S.TopBar>

      {/* Income 컴포넌트처럼 입력 가능한 Input 형태로 변경 */}
      <S.DescDisplay $isPlaceholder={!desc}>
        <S.DescInput placeholder="내역" value={desc} onChange={(e) => setDesc(e.target.value)} />
      </S.DescDisplay>

      <S.CategoryContainer $hasSelected={!!selectedCategory}>
        {categories.map((c) => (
          <S.CategoryBadge
            key={c.alt}
            src={c.src}
            alt={c.alt}
            $active={selectedCategory === c.alt}
            $dimOthers={!!selectedCategory && selectedCategory !== c.alt}
            onClick={() => handleCategoryClick(c.alt)}
          />
        ))}
      </S.CategoryContainer>

      <S.MethodContainer>
        <S.MethodButton $active={selectedMethod === 'cash'} onClick={() => handleMethodClick('cash')}>
          현금
        </S.MethodButton>
        <S.MethodButton $active={selectedMethod === 'card'} onClick={() => handleMethodClick('card')}>
          카드
        </S.MethodButton>
        {/* 기존 코드의 오타 수정 ($active 조건: 'cash' -> 'etc') */}
        <S.MethodButton $active={selectedMethod === 'etc'} onClick={() => handleMethodClick('etc')}>
          기타
        </S.MethodButton>
      </S.MethodContainer>
    </S.Container>
  );
}
