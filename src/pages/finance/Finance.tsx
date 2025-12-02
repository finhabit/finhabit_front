import { useMemo } from 'react';
import BottomNav from '@/components/BottomNav';
import { useNavigate } from 'react-router-dom';

// 아이콘
import bellIcon from '@/assets/bell.svg';
import bulbIcon from '@/assets/bulb.svg';
import quizIcon from '@/assets/quiz.svg';
import calendarIcon from '@/assets/calendar.svg';
import plusIcon from '@/assets/plus.svg';

import * as S from './Finance.style';

export default function Finance() {
  // 카드 사이 간격: 1→2 = 33px, 2→3 = 27px
  const gaps = useMemo(() => ({ afterFirst: 33, afterSecond: 27 }), []);
  const navigate = useNavigate();

  return (
    <S.Screen>
      <S.SafeArea>
        {/* 상단 헤더 (오른쪽 아이콘 고정) */}
        <S.Header>
          <S.HeaderSpacer />
          <S.HeaderIcons>
            <S.IconBtn aria-label="알림">
              <S.TopIcon src={bellIcon} alt="bell" onClick={() => navigate('/notification')} />
            </S.IconBtn>
          </S.HeaderIcons>
        </S.Header>

        {/* 오늘의 지식 */}
        <S.Section>
          <S.TitleRow>
            <S.Left>
              <S.TinyIcon src={bulbIcon} alt="지식" />
              <S.TitleText>오늘의 지식</S.TitleText>
            </S.Left>
            <S.Right>
              <S.TinyPlus src={plusIcon} alt="추가" onClick={() => navigate('/knowledge')} />
            </S.Right>
          </S.TitleRow>

          <S.CardKnowledge>
            <S.CardBody>
              <S.CardTop>신용점수 관리의 중요성</S.CardTop>
              <S.CardTitle>
                신용점수는 ‘금융 신뢰도’입니다. <br />
                연체나 과도한 대출은 점수를 낮춥니다.
              </S.CardTitle>
            </S.CardBody>
          </S.CardKnowledge>

          <S.Gap style={{ height: gaps.afterFirst }} />
        </S.Section>

        {/* 오늘의 퀴즈 */}
        <S.Section>
          <S.TitleRow>
            <S.Left>
              <S.TinyIcon src={quizIcon} alt="퀴즈" />
              <S.TitleText>오늘의 퀴즈</S.TitleText>
            </S.Left>
            <S.Right>
              <S.TinyPlus src={plusIcon} alt="추가" onClick={() => navigate('/quiz')} />
            </S.Right>
          </S.TitleRow>

          <S.CardQuiz>
            <S.CardBody>
              <S.CardTop>Q. 신용점수를 올리려면 어떻게 해야 할까요?</S.CardTop>
              <S.Q_CardTitle>① 연체하지 않기 ② 카드 많이 만들기 ③ 대출 자주 받기</S.Q_CardTitle>
            </S.CardBody>
          </S.CardQuiz>

          <S.Gap style={{ height: gaps.afterSecond }} />
        </S.Section>

        {/* 주간 월간 모아보기 */}
        <S.Section>
          <S.TitleRow>
            <S.Left>
              <S.TinyIcon src={calendarIcon} alt="모아보기" />
              <S.TitleText>주간 월간 모아보기</S.TitleText>
            </S.Left>
            <S.Right>
              <S.TinyPlus src={plusIcon} alt="추가" onClick={() => navigate('/knowledge')} />
            </S.Right>
          </S.TitleRow>

          <S.CardArchive>
            <S.CardBody1>
              <S.Card1>
                <S.CardTop>보험의 역할</S.CardTop>
                <S.A_CardTitle>
                  보험은 사고나 질병 등 예상치 못한 <br />
                  위험에 대비하는 ‘보호장치’입니다.
                </S.A_CardTitle>
              </S.Card1>
              <S.Card1>
                <S.CardTop>분산투자의 의미</S.CardTop>
                <S.A_CardTitle>
                  자산을 여러 종목에 나눠 투자해 <br />
                  위험을 줄이는 방법입니다.
                </S.A_CardTitle>
              </S.Card1>
            </S.CardBody1>
          </S.CardArchive>
        </S.Section>

        <S.BottomSpacer />
      </S.SafeArea>

      <BottomNav />
    </S.Screen>
  );
}
