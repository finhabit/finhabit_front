import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import back from '@/assets/back.svg';
import * as S from './Knowledge.style';

export default function Knowledge() {
  const navigate = useNavigate();

  // 탭 상태: 'weekly' | 'monthly'
  const [tab, setTab] = useState('weekly');

  return (
    <>
      <S.UpLine>
        <S.Icons src={back} alt="이전으로" onClick={() => navigate(-1)} />
        지식
      </S.UpLine>

      <S.RemindingSection>
        {/* 오늘의 지식 */}
        <S.N_Section>
          오늘의 지식
          <S.ContentBox>
            <S.PerK>
              <S.KTitle>신용점수 관리의 중요성</S.KTitle>
              <div>
                신용점수는 '금융 신뢰도'입니다.
                <br /> 연체나 과도한 대출은 점수를 낮춥니다.
              </div>
            </S.PerK>
          </S.ContentBox>
        </S.N_Section>

        {/* 주간 / 월간 버튼 */}
        <S.TabHugger>
          지식 모아보기
          <S.TabWrapper>
            <S.TabButton $active={tab === 'weekly'} onClick={() => setTab('weekly')}>
              주간
            </S.TabButton>

            <S.TabButton $active={tab === 'monthly'} onClick={() => setTab('monthly')}>
              월간
            </S.TabButton>
          </S.TabWrapper>
        </S.TabHugger>

        {/* 탭 컨텐츠 */}
        <S.N_Section>
          <S.ContentBox1>
            {tab === 'weekly' ? (
              <>
                <S.PerGath>
                  <S.GathTitle>보험의 역할</S.GathTitle>
                  <S.GathContent>보험은 사고나 질병 등 예상치 못한 위험에 대비하는 '보호장치'입니다.</S.GathContent>
                </S.PerGath>

                <S.PerGath>
                  <S.GathTitle>분산투자의 의미</S.GathTitle>
                  <S.GathContent>자산을 여러 종목에 나눠 투자해 위험을 줄이는 방법입니다.</S.GathContent>
                </S.PerGath>
              </>
            ) : (
              <>
                <S.PerGath>
                  <S.GathTitle>월간 금융 팁</S.GathTitle>
                  <S.GathContent>한 달 지출을 점검하고 고정비 절감 포인트를 체크해보세요.</S.GathContent>
                </S.PerGath>

                <S.PerGath>
                  <S.GathTitle>신용관리 체크</S.GathTitle>
                  <S.GathContent>정기적으로 신용점수를 확인해 점수 변화에 대비하는 것이 중요합니다.</S.GathContent>
                </S.PerGath>
              </>
            )}
          </S.ContentBox1>
        </S.N_Section>
      </S.RemindingSection>
    </>
  );
}
