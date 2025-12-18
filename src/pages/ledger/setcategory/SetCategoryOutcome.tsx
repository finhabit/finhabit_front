import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './SetCategory.style';

import { createLedger, modifyLedger } from '@/api/ledger.api';
import type { CreateLedgerRequest, PaymentType } from '@/types/ledger';

import arrow_left_alt from '@/assets/arrow_left_alt.svg';
import close from '@/assets/close.svg';
import categoryeat from '@/assets/categoryeat.svg';
import categorytran from '@/assets/categorytran.svg';
import categoryshopping from '@/assets/categoryshopping.svg';
import categoryrest from '@/assets/categoryrest.svg';
import categoryetc from '@/assets/etcbtn.svg';

const ID_TO_CATEGORY: Record<number, string> = {
  4: '식비',
  5: '교통',
  6: '여가',
  7: '쇼핑',
  8: '기타',
};

export default function SetCategoryOutcome() {
  const navigate = useNavigate();
  const location = useLocation();

  const { mode, ledgerId, initialData } = location.state || {};

  const amountData = location.state?.amount ?? (mode === 'edit' ? initialData?.amount : 0);
  const dateData = mode === 'edit' ? initialData?.date : location.state?.date || new Date().toISOString().split('T')[0];

  const [desc, setDesc] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<'cash' | 'card' | 'etc' | null>(null);

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      const categoryName = ID_TO_CATEGORY[initialData.categoryId] || '기타';
      setSelectedCategory(categoryName);

      setDesc(initialData.merchant || '');

      const paymentLower = initialData.payment?.toLowerCase();
      if (['cash', 'card', 'etc'].includes(paymentLower)) {
        setSelectedMethod(paymentLower as 'cash' | 'card' | 'etc');
      }
    }
  }, [mode, initialData]);

  const CATEGORY_MAP: Record<string, number> = {
    식비: 4,
    교통: 5,
    여가: 6,
    쇼핑: 7,
    기타: 8,
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
      setSelectedMethod(null);
      return;
    }
    setSelectedCategory(altText);
    setSelectedMethod(null);
  };

  const handleMethodClick = async (method: 'cash' | 'card' | 'etc') => {
    if (!selectedCategory) {
      alert('카테고리를 먼저 선택해주세요.');
      return;
    }

    if (selectedCategory === '기타' && !desc.trim()) {
      alert('기타 카테고리는 내역을 입력해야 합니다.');
      return;
    }

    setSelectedMethod(method);

    try {
      const categoryId = CATEGORY_MAP[selectedCategory] || 8;
      const paymentMethod = method.toUpperCase() as PaymentType;

      const requestData: CreateLedgerRequest = {
        amount: -Math.abs(Number(amountData)),
        date: dateData,
        categoryId: categoryId,
        merchant: desc.trim() || selectedCategory,
        payment: paymentMethod,
      };

      if (mode === 'edit' && ledgerId) {
        await modifyLedger(ledgerId, requestData);
        alert('수정되었습니다.');
      } else {
        await createLedger(requestData);
      }

      navigate('/ledgercalendar');
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
          <S.Amount>{Number(amountData).toLocaleString()}원</S.Amount>
        </div>
        <S.Icon src={close} alt="close" onClick={() => navigate('/ledger')} />
      </S.TopBar>

      <S.DescDisplay $isPlaceholder={!desc}>
        <S.DescInput
          placeholder="내역 입력 (선택)"
          value={desc}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDesc(e.target.value)}
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
