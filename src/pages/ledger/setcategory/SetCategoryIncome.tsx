import { useState } from 'react';
import * as S from './SetCategory.style';
import { useNavigate } from 'react-router-dom';

import arrow_left_alt from '@/assets/arrow_left_alt.svg';
import close from '@/assets/close.svg';
import categorysalary from '@/assets/salarybtn.svg';
import categoryallow from '@/assets/allowancebtn.svg';
import categoryetc from '@/assets/etcbtn.svg';
import save from '@/assets/save.svg';

export default function SetCategoryIncome() {
  const navigate = useNavigate();
  const [desc, setDesc] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<'cash' | 'card' | null>(null);

  const categories = [
    { src: categorysalary, alt: '급여' },
    { src: categoryallow, alt: '용돈' },
    { src: categoryetc, alt: '기타' },
  ];

  // 카테고리 클릭 시
  // 카테고리 클릭 시
  const handleCategoryClick = (altText: string) => {
    if (selectedCategory === altText) {
      setSelectedCategory(null);
      setDesc('');
      return;
    }

    setSelectedCategory(altText);

    if (altText === '기타') {
      if (desc.trim() !== '') {
        navigate('/ledgercalendar');
      }
      return;
    }

    setDesc(altText);
    navigate('/ledgercalendar');
  };

  const handleMethodClick = (method: 'cash' | 'card') => {
    setSelectedMethod(method);
    navigate('/ledgercalendar');
  };

  return (
    <S.Container>
      <S.TopBar>
        <div>
          <S.Icon src={arrow_left_alt} alt="arrow" onClick={() => navigate(-1)} />
          <S.Amount_I>2,000원</S.Amount_I>
        </div>
        <S.Icon src={close} alt="close" onClick={() => navigate('/ledger')} />
      </S.TopBar>

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

      <S.SaveBtn src={save} alt="메모버튼" />
    </S.Container>
  );
}
