import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getLedgerHome } from '@/api/ledger.api';
import type { LedgerHomeResponse } from '@/types/ledger';

import back from '@/assets/back.svg';
import setting from '@/assets/settingsicon.svg';
import piggybank from '@/assets/mission.svg';
import plus from '@/assets/plus.svg';
import percategory from '@/assets/percategory.svg';
import dumcat from '@/assets/categoryeat.svg';
import chartIcon from '@/assets/chart.svg';

import ComingSoon from '@/components/ComingSoon';
import Donuts, { type CategoryData } from '@/components/Donuts';
import * as S from './LedgerMain.style';

const CHART_COLORS = [
  '#b6be40ff',
  '#626b00ff',
  '#cbd638ff',
  '#3e4300ff',
  '#FFADAD',
  '#FFD6A5',
  '#FDFFB6',
  '#CAFFBF',
  '#9BF6FF',
];

export default function LedgerMain() {
  const navigate = useNavigate();

  const [ledgerData, setLedgerData] = useState<LedgerHomeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getLedgerHome();
        setLedgerData(data);
      } catch (error) {
        console.error('Failed to fetch ledger home:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const openOverlay = () => setIsOverlayOpen(true);
  const closeOverlay = () => setIsOverlayOpen(false);

  const getChartData = (): CategoryData[] => {
    if (!ledgerData?.todayCategories) return [];

    return ledgerData.todayCategories.map((cat, index) => ({
      id: cat.categoryId,
      label: cat.categoryName,
      ratio: cat.percent,
      color: CHART_COLORS[index % CHART_COLORS.length],
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (!ledgerData) return <div>데이터를 불러오지 못했습니다.</div>;

  return (
    <>
      <S.UpLine>
        <S.Icons src={back} alt="이전으로" onClick={() => navigate('/home')} />
        가계부
        <S.Icons src={setting} alt="설정아이콘" onClick={openOverlay} />
      </S.UpLine>

      <S.ConsumeSection>
        <S.L_Section>
          <S.L_Header>
            <S.MiniIcons src={piggybank} alt="저금통 아이콘" />
            오늘의 소비
            <S.PlusIcons src={plus} alt="추가버튼" onClick={() => navigate('/consumeplus')} />
          </S.L_Header>
          <S.ContentBox_1>
            {ledgerData.today.ledgers.length > 0 ? (
              ledgerData.today.ledgers.map((item) => (
                <S.Perrow key={item.ledgerId}>
                  <div>{item.merchant}</div>
                  <div>{item.amount.toLocaleString()}원</div>
                </S.Perrow>
              ))
            ) : (
              <div style={{ padding: '10px', color: '#999', fontSize: '14px' }}>오늘 소비 내역이 없습니다.</div>
            )}
          </S.ContentBox_1>
        </S.L_Section>

        <S.L_Section>
          <S.L_Header>
            <S.MiniIcons src={percategory} alt="카테고리 아이콘" />
            카테고리별 소비
            <S.PlusIcons src={plus} alt="추가버튼" onClick={() => navigate('/ledgercalendar')} />
          </S.L_Header>
          <S.ContentBox>
            {ledgerData.todayCategories.length > 0 ? (
              ledgerData.todayCategories.map((cat) => (
                <S.Perrow key={cat.categoryId}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <S.CategoryIcon src={dumcat} alt={cat.categoryName} />
                    <div>{cat.categoryName}</div>
                  </div>
                  <div>{cat.amount.toLocaleString()}원</div>
                </S.Perrow>
              ))
            ) : (
              <div style={{ padding: '10px', color: '#999', fontSize: '14px' }}>카테고리 내역이 없습니다.</div>
            )}
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
          {getChartData().length > 0 ? (
            <Donuts categories={getChartData()} size={170} />
          ) : (
            <div style={{ padding: '40px 0', color: '#999', textAlign: 'center' }}>표시할 데이터가 없습니다.</div>
          )}
        </S.SummaryCard>
      </S.Section>

      {isOverlayOpen && <ComingSoon onClick={closeOverlay} />}
    </>
  );
}
