import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import close from '@/assets/close.svg';
import won from '@/assets/won.svg';
import * as S from './ConsumePlus.style';

export default function ConsumePlus() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState<string>('');

  const today = new Date();
  const displayDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
  const apiDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.includes('-') || (value !== '' && parseInt(value) < 0)) {
      return;
    }

    setAmount(value);
  };

  const handleTypeSelect = (type: 'income' | 'outcome') => {
    if (!amount || parseInt(amount) <= 0) {
      alert('금액을 입력해주세요.');
      return;
    }

    const targetPath = type === 'income' ? '/setcategoryincome' : '/setcategoryoutcome';

    navigate(targetPath, {
      state: {
        amount: parseInt(amount),
        date: apiDate,
      },
    });
  };

  return (
    <>
      <S.Header>
        <S.DateText>{displayDate}</S.DateText>
        <S.CloseBtn src={close} alt="취소아이콘" onClick={() => navigate(-1)} />
      </S.Header>

      <S.AmountBox>
        <S.WonImg src={won} alt="원 글자" />
        <S.Input type="number" placeholder="0" value={amount} onChange={handleAmountChange} min="0" />
      </S.AmountBox>

      <S.ButtonSection>
        <S.TypeButton $active={false} color="#68B6F3" onClick={() => handleTypeSelect('income')}>
          수입
        </S.TypeButton>
        <S.TypeButton $active={false} color="#F87171" onClick={() => handleTypeSelect('outcome')}>
          지출
        </S.TypeButton>
      </S.ButtonSection>
    </>
  );
}
