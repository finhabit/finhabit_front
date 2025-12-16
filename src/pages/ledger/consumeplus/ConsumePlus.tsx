import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation 추가
import close from '@/assets/close.svg';
import won from '@/assets/won.svg';
import * as S from './ConsumePlus.style';

export default function ConsumePlus() {
  const navigate = useNavigate();
  const location = useLocation(); // 넘어온 데이터 받기 위해 추가

  // ✨ 이전 페이지(LedgerCalendar)에서 넘겨준 데이터 추출
  const { mode, ledgerId, initialData } = location.state || {};

  // ✨ 초기값 설정: 수정 모드면 기존 금액, 아니면 빈 값
  const [amount, setAmount] = useState<string>(mode === 'edit' && initialData ? String(initialData.amount) : '');

  // ✨ 날짜 설정 로직 변경
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    if (mode === 'edit' && initialData?.date) {
      // 수정 모드면 기존 날짜 사용
      setCurrentDate(new Date(initialData.date));
    } else {
      // 아니면 오늘 날짜
      setCurrentDate(new Date());
    }
  }, [mode, initialData]);

  // 화면 표시용 날짜 (YYYY.MM.DD)
  const displayDate = `${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${String(currentDate.getDate()).padStart(2, '0')}`;

  // API 전송용 날짜 (YYYY-MM-DD)
  const apiDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

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

    // ✨ 다음 페이지(카테고리 설정)로 이동할 때도 수정 정보를 계속 넘겨줍니다.
    navigate(targetPath, {
      state: {
        amount: parseInt(amount),
        date: apiDate,
        // 👇 수정 관련 정보 전달 (없으면 undefined가 되므로 신규 생성 시에는 영향 없음)
        mode: mode,
        ledgerId: ledgerId,
        initialData: initialData,
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
