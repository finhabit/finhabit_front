import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import back from '@/assets/back.svg';
import * as S from './Notification.style';

export default function Notification() {
  const navigate = useNavigate();
  const [isOn, setIsOn] = useState(true);

  return (
    <>
      <S.UpLine>
        <S.Icons src={back} alt="이전으로" onClick={() => navigate(-1)} />
        알림
      </S.UpLine>

      {/* 알림 토글 */}
      <S.ToggleSection>
        <span>알림</span>
        <S.ToggleWrapper onClick={() => setIsOn(!isOn)} isOn={isOn}>
          <S.ToggleCircle isOn={isOn} />
        </S.ToggleWrapper>
      </S.ToggleSection>

      {isOn && (
        <S.RemindingSection>
          <S.N_Section>
            미션 리마인드
            <S.ContentBox>
              오늘도 성공!
              <br />
              Finhabit이 당신의 습관을 응원해요
            </S.ContentBox>
          </S.N_Section>
          <S.N_Section>
            학습 리마인드
            <S.ContentBox>
              오늘의 금융 지식이 도착했어요!
              <br />
              '신용점수 관리법' 한 번 볼까요?
            </S.ContentBox>
          </S.N_Section>
          <S.N_Section>
            피드백 알림
            <S.ContentBox>
              지난달보다 외식비가 2만원 감소했어요.
              <br />
              멋진 변화예요!
            </S.ContentBox>
          </S.N_Section>
        </S.RemindingSection>
      )}
    </>
  );
}
