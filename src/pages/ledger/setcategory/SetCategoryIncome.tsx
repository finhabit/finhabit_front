import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './SetCategory.style';

import { createLedger, modifyLedger } from '@/api/ledger.api';
import type { CreateLedgerRequest } from '@/types/ledger';

import arrow_left_alt from '@/assets/arrow_left_alt.svg';
import close from '@/assets/close.svg';
import categorysalary from '@/assets/salarybtn.svg';
import categoryallow from '@/assets/allowancebtn.svg';
import categoryetc from '@/assets/etcbtn.svg';

const ID_TO_CATEGORY: Record<number, string> = {
  1: '급여',
  2: '용돈',
  3: '기타',
};

export default function SetCategoryIncome() {
  const navigate = useNavigate();
  const location = useLocation();

  const { mode, ledgerId, initialData } = location.state || {};

  const amountData = location.state?.amount ?? (mode === 'edit' ? initialData?.amount : 0);
  const dateData = mode === 'edit' ? initialData?.date : location.state?.date || new Date().toISOString().split('T')[0];

  const [desc, setDesc] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      const categoryName = ID_TO_CATEGORY[initialData.categoryId] || '기타';
      setSelectedCategory(categoryName);
      setDesc(initialData.merchant || '');
    }
  }, [mode, initialData]);

  const CATEGORY_MAP: Record<string, number> = {
    급여: 1,
    용돈: 2,
    기타: 3,
  };

  const categories = [
    { src: categorysalary, alt: '급여' },
    { src: categoryallow, alt: '용돈' },
    { src: categoryetc, alt: '기타' },
  ];

  const handleCategoryClick = async (categoryName: string) => {
    setSelectedCategory(categoryName);

    if (!desc.trim()) {
      alert('내역을 입력해주세요.');
      return;
    }

    try {
      const categoryId = CATEGORY_MAP[categoryName] || 3;
      const finalMerchant = desc.trim();

      const requestData: CreateLedgerRequest = {
        amount: Math.abs(Number(amountData)),
        date: dateData,
        categoryId: categoryId,
        merchant: finalMerchant,
        payment: 'CASH',
      };

      if (mode === 'edit' && ledgerId) {
        await modifyLedger(ledgerId, requestData);
        alert('수정되었습니다.');
      } else {
        await createLedger(requestData);
      }

      navigate('/ledgercalendar');
    } catch (error) {
      console.error('수입 내역 저장 실패:', error);
      alert('저장에 실패했습니다.');
    }
  };

  return (
    <S.Container>
      <S.TopBar>
        <div>
          <S.Icon src={arrow_left_alt} alt="arrow" onClick={() => navigate(-1)} />
          <S.Amount_I>{Number(amountData).toLocaleString()}원</S.Amount_I>
        </div>
        <S.Icon src={close} alt="close" onClick={() => navigate('/ledger')} />
      </S.TopBar>

      <S.DescDisplay $isPlaceholder={!desc}>
        <S.DescInput
          placeholder="내역 입력"
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
    </S.Container>
  );
}
