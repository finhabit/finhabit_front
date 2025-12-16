import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './SetCategory.style';

import { createLedger } from '@/api/ledger.api';

import arrow_left_alt from '@/assets/arrow_left_alt.svg';
import close from '@/assets/close.svg';
import categorysalary from '@/assets/salarybtn.svg';
import categoryallow from '@/assets/allowancebtn.svg';
import categoryetc from '@/assets/etcbtn.svg';

export default function SetCategoryIncome() {
  const navigate = useNavigate();
  const location = useLocation();

  const { amount = 0, date = new Date().toISOString().split('T')[0] } = location.state || {};

  const [desc, setDesc] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const CATEGORY_MAP: Record<string, number> = {
    급여: 11,
    용돈: 12,
    기타: 13,
  };

  const categories = [
    { src: categorysalary, alt: '급여' },
    { src: categoryallow, alt: '용돈' },
    { src: categoryetc, alt: '기타' },
  ];

  // API 호출 및 네비게이션을 담당하는 핵심 함수
  const handleSubmit = async (categoryName: string, description: string) => {
    try {
      if (!categoryName) return;

      // '기타'를 선택했으나 내역이 없는 경우 예외 처리
      if (categoryName === '기타' && !description.trim()) {
        alert('기타 카테고리는 내역을 입력해야 합니다.');
        return;
      }

      const categoryId = CATEGORY_MAP[categoryName] || 13;

      await createLedger({
        amount: Number(amount),
        date: date,
        categoryId: categoryId,
        merchant: description || categoryName,
        payment: 'CASH', // 수입은 CASH로 통일
      });

      navigate('/ledgercalendar'); // 저장 성공 시 달력 페이지로 이동
    } catch (error) {
      console.error('수입 내역 저장 실패:', error);
      alert('저장에 실패했습니다.');
    }
  };

  const onCategoryBadgeClick = (altText: string) => {
    // 이미 선택된 카테고리를 다시 클릭하면 선택 해제
    if (selectedCategory === altText) {
      setSelectedCategory(null);
      setDesc('');
      return;
    }

    setSelectedCategory(altText);

    if (altText !== '기타') {
      // 급여, 용돈은 내역을 카테고리 이름으로 설정하고 바로 저장
      setDesc(altText);
      handleSubmit(altText, altText);
    } else {
      // 기타는 내역 입력을 위해 DescInput에 포커스를 맞추고, Enter를 기다림
      setDesc('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // '기타' 카테고리 선택 후 내역 입력(desc) 시 Enter 키로 저장
    if (e.key === 'Enter' && selectedCategory === '기타' && desc.trim()) {
      handleSubmit(selectedCategory, desc.trim());
    } else if (e.key === 'Enter' && selectedCategory === '기타' && !desc.trim()) {
      // 기타 선택 후 내용 없이 Enter를 눌렀을 때
      alert('내역을 입력해주세요.');
    }
  };

  return (
    <S.Container>
      <S.TopBar>
        <div>
          <S.Icon src={arrow_left_alt} alt="arrow" onClick={() => navigate(-1)} />
          <S.Amount_I>{Number(amount).toLocaleString()}원</S.Amount_I>
        </div>
        <S.Icon src={close} alt="close" onClick={() => navigate('/ledger')} />
      </S.TopBar>

      <S.DescDisplay $isPlaceholder={!desc}>
        <S.DescInput
          placeholder="내역 (기타 선택 시 입력 후 엔터)"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          onKeyDown={handleKeyDown}
          // '급여'/'용돈' 선택 시에는 입력 막기
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
            onClick={() => onCategoryBadgeClick(c.alt)}
          />
        ))}
      </S.CategoryContainer>
    </S.Container>
  );
}
