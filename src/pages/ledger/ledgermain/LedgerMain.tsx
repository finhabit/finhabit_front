import { useNavigate } from 'react-router-dom';
import back from '@/assets/back.svg';
import setting from '@/assets/settingsicon.svg';
import piggybank from '@/assets/mission.svg';
import plus from '@/assets/plus.svg';
import percategory from '@/assets/percategory.svg';
import dumcat from '@/assets/categoryeat.svg';
import chartIcon from '@/assets/chart.svg';
import Donuts from '@/components/Donuts';
import * as S from './LedgerMain.style';

export default function LedgerMain() {
  const navigate = useNavigate();

  return (
    <>
      <S.UpLine>
        <S.Icons src={back} alt="이전으로" onClick={() => navigate('/home')} />
        가계부
        <S.Icons src={setting} alt="설정아이콘" />
      </S.UpLine>
      <S.ConsumeSection>
        <S.L_Section>
          <S.L_Header>
            <S.MiniIcons src={piggybank} alt="저금통 아이콘" />
            오늘의 소비
            <S.PlusIcons src={plus} alt="추가버튼" onClick={() => navigate('/consumeplus')} />
          </S.L_Header>
          <S.ContentBox_1>
            <S.Perrow>
              <div>메가커피</div>
              <div>2,000원</div>
            </S.Perrow>
          </S.ContentBox_1>
        </S.L_Section>
        <S.L_Section>
          <S.L_Header>
            <S.MiniIcons src={percategory} alt="카테고리 아이콘" />
            카테고리별 소비
            <S.PlusIcons src={plus} alt="추가버튼" onClick={() => navigate('/ledgercalendar')} />
          </S.L_Header>
          <S.ContentBox>
            <S.Perrow>
              <S.CategoryIcon src={dumcat} alt="더미 카테고리 아이콘" />
              <div>음료</div>
              <div>2,000원</div>
            </S.Perrow>
          </S.ContentBox>
        </S.L_Section>
      </S.ConsumeSection>

      <S.Section>
        <S.TitleRow>
          <S.Left>
            <S.MiniIcons src={chartIcon} alt="소비 요약" />
            <S.TitleText>간단 소비 요약</S.TitleText>
          </S.Left>
          <S.Right>
            <S.PlusIcons src={plus} alt="추가버튼" onClick={() => navigate('/ledgercalendar')} />
          </S.Right>
        </S.TitleRow>
        <S.SummaryCard>
          <Donuts />
        </S.SummaryCard>
      </S.Section>
    </>
  );
}
