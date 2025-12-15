import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import back from '@/assets/back.svg';
import * as S from './Knowledge.style';

// API 함수 및 타입 import (수정된 파일 사용)
import { getTodayKnowledge, getKnowledgeList } from '@/api/knowledge.api';
import type { Knowledge as KnowledgeType } from '@/api/knowledge.api'; // 경로 확인 필요

type TabType = 'weekly' | 'monthly';

export default function Knowledge() {
  const navigate = useNavigate();

  const [tab, setTab] = useState<TabType>('weekly');
  const [today, setToday] = useState<KnowledgeType | null>(null);
  const [list, setList] = useState<KnowledgeType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTodayKnowledge().then(setToday).catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    getKnowledgeList(tab === 'weekly' ? 'WEEKLY' : 'MONTHLY')
      .then(setList)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [tab]);

  return (
    <>
      <S.UpLine>
        <S.Icons src={back} alt="이전으로" onClick={() => navigate(-1)} />
        지식
      </S.UpLine>

      <S.RemindingSection>
        <S.N_Section>
          오늘의 지식
          <S.ContentBox>
            {today ? (
              <S.PerK>
                <S.KTitle>{today.cardTitle}</S.KTitle>
                <div>{today.cardContent}</div>
              </S.PerK>
            ) : (
              <div>오늘의 지식이 없습니다.</div>
            )}
          </S.ContentBox>
        </S.N_Section>

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
        <S.N_Section>
          <S.ContentBox1>
            {loading ? (
              <div>불러오는 중...</div>
            ) : list.length > 0 ? (
              list.map((item, idx) => (
                <S.PerGath key={item.financeId || idx}>
                  <S.GathTitle>{item.cardTitle}</S.GathTitle>
                  <S.GathContent>{item.cardContent}</S.GathContent>
                </S.PerGath>
              ))
            ) : (
              <div>표시할 지식이 없습니다.</div>
            )}
          </S.ContentBox1>
        </S.N_Section>
      </S.RemindingSection>
    </>
  );
}
