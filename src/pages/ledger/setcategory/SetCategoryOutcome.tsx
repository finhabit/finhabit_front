import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './SetCategory.style';

import { createLedger } from '@/api/ledger.api';

import arrow_left_alt from '@/assets/arrow_left_alt.svg';
import close from '@/assets/close.svg';
import categoryeat from '@/assets/categoryeat.svg';
import categorytran from '@/assets/categorytran.svg';
import categoryshopping from '@/assets/categoryshopping.svg';
import categoryrest from '@/assets/categoryrest.svg';
import categoryetc from '@/assets/etcbtn.svg';

export default function SetCategoryOutcome() {
  const navigate = useNavigate();
  const location = useLocation();

  const { amount = 0, date = new Date().toISOString().split('T')[0] } = location.state || {};

  const [desc, setDesc] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<'cash' | 'card' | 'etc' | null>(null);

  const CATEGORY_MAP: Record<string, number> = {
    식비: 1,
    쇼핑: 2,
    여가: 3,
    교통: 4,
    기타: 5,
  };

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
      setSelectedMethod(null); // 카테고리 해제 시 결제 수단도 해제
      return;
    }
    setSelectedCategory(altText);

    if (altText === '기타') {
      setDesc('');
    } else {
      setDesc(altText);
    }
    // 카테고리 변경 시 결제 수단 선택 상태 해제
    setSelectedMethod(null);
  };

  const handleMethodClick = async (method: 'cash' | 'card' | 'etc') => {
    if (!selectedCategory) {
      alert('카테고리를 먼저 선택해주세요.');
      return;
    }

    // '기타' 카테고리를 선택했으나 내역이 비어있는 경우
    if (selectedCategory === '기타' && !desc.trim()) {
      alert('기타 카테고리는 내역을 입력해야 합니다.');
      return;
    }

    setSelectedMethod(method);

    try {
      const categoryId = CATEGORY_MAP[selectedCategory] || 5;

      const paymentMethod = method.toUpperCase();

      await createLedger({
        amount: Number(amount),
        date: date,
        categoryId: categoryId,
        merchant: desc || selectedCategory, // desc가 비어있으면 selectedCategory 사용
        payment: paymentMethod,
      });

      navigate('/ledgercalendar'); // 저장 성공 시 달력 페이지로 이동
    } catch (error) {
      console.error('지출 내역 저장 실패:', error);
      alert('저장에 실패했습니다.');
    }
  };

  return (
    <S.Container>
      <S.TopBar>
        <div>
          <S.Icon src={arrow_left_alt} alt="arrow" onClick={() => navigate(-1)} />
          <S.Amount>{Number(amount).toLocaleString()}원</S.Amount>
        </div>
        <S.Icon src={close} alt="close" onClick={() => navigate('/ledger')} />
      </S.TopBar>

      <S.DescDisplay $isPlaceholder={!desc}>
        <S.DescInput
          placeholder="내역"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          disabled={selectedCategory !== '기타' && selectedCategory !== null}
        />
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
        <S.MethodButton $active={selectedMethod === 'etc'} onClick={() => handleMethodClick('etc')}>
          기타
        </S.MethodButton>
      </S.MethodContainer>
    </S.Container>
  );
}
