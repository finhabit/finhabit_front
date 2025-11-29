import { useNavigate } from 'react-router-dom';
import back from '@/assets/back.svg';
import checked from '@/assets/checked.svg';
import * as S from './Mission.style';

export default function Mission() {
  const navigate = useNavigate();

  return (
    <>
      <S.UpLine>
        <S.Icons src={back} alt="이전으로" onClick={() => navigate(-1)} />
        미션
      </S.UpLine>
      <S.RemindingSection>
        <S.N_Section>
          미션 모아보기
          <S.ContentBox>
            <S.PerMission>이번 주 목표 저축금액 5천원 달성하기</S.PerMission>
            <S.PerMission>이번 주 배운 금융 용어 3개 복습하기</S.PerMission>
          </S.ContentBox>
        </S.N_Section>
        <S.N_Section>
          미션 진행 상황
          <S.ContentBox>
            <S.ProgressItem>
              <S.ProgressTitle>이번 주 배운 금융 용어 3개 복습하기</S.ProgressTitle>
              <S.ProgressBar>
                <S.ProgressFill percent={30} />
              </S.ProgressBar>
              <S.ProgressPercent>30%</S.ProgressPercent>
            </S.ProgressItem>

            <S.ProgressItem>
              <S.ProgressTitle>이번 주 목표 저축금액 5천원 달성하기</S.ProgressTitle>
              <S.ProgressBar>
                <S.ProgressFill percent={20} />
              </S.ProgressBar>
              <S.ProgressPercent>20%</S.ProgressPercent>
            </S.ProgressItem>
          </S.ContentBox>
        </S.N_Section>
        <S.N_Section>
          완료한 미션들
          <S.ContentBox>
            <S.PerCheck>
              <div>소비 내역 1건 직접 입력하기</div>
              <S.Checked src={checked} alt="완료" />
            </S.PerCheck>
            <S.PerCheck>
              <div>배달앱 대신 직접 포장 주문하기</div>
              <S.Checked src={checked} alt="완료" />
            </S.PerCheck>
          </S.ContentBox>
        </S.N_Section>
      </S.RemindingSection>
    </>
  );
}
