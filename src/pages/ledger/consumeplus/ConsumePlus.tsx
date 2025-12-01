import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import close from '@/assets/close.svg';
import won from '@/assets/won.svg';
import * as S from './ConsumePlus.style';

export default function ConsumePlus() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState<string>('');
  const [selected, setSelected] = useState<'income' | 'outcome' | ''>('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleTypeSelect = (type: 'income' | 'outcome') => {
    setSelected(type);

    if (type === 'income') {
      navigate('/setcategoryincome');
    } else {
      navigate('/setcategoryoutcome');
    }
  };

  return (
    <>
      <S.Header>
        <S.DateText>2025.04.06</S.DateText>
        <S.CloseBtn src={close} alt="취소아이콘" onClick={() => navigate(-1)} />
      </S.Header>

      <S.AmountBox>
        <S.WonImg src={won} alt="원 글자" />
        <S.Input type="number" placeholder="0" value={amount} onChange={handleAmountChange} />
      </S.AmountBox>

      <S.ButtonSection>
        <S.TypeButton $active={selected === 'income'} color="#68B6F3" onClick={() => handleTypeSelect('income')}>
          수입
        </S.TypeButton>
        <S.TypeButton $active={selected === 'outcome'} color="#F87171" onClick={() => handleTypeSelect('outcome')}>
          지출
        </S.TypeButton>
      </S.ButtonSection>
    </>
  );
}
