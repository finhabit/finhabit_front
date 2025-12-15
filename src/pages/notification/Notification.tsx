import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import back from '@/assets/back.svg';
import * as S from './Notification.style';

import {
  toggleNotification,
  getMissionNotification,
  getFinanceNotification,
  getFeedbackNotification,
} from '@/api/notification.api';
import type { NotificationCard } from '@/types/notification';

const NOTIFICATION_TOGGLE_KEY = 'notificationToggleState';

export default function Notification() {
  const navigate = useNavigate();

  const savedToggleState = localStorage.getItem(NOTIFICATION_TOGGLE_KEY);
  const initialIsOn = savedToggleState ? JSON.parse(savedToggleState) : true;
  const [isOn, setIsOn] = useState(initialIsOn);

  const [missionNoti, setMissionNoti] = useState<NotificationCard | null>(null);
  const [financeNoti, setFinanceNoti] = useState<NotificationCard | null>(null);
  const [feedbackNoti, setFeedbackNoti] = useState<NotificationCard | null>(null);

  const fetchNotificationData = async () => {
    try {
      const results = await Promise.allSettled([
        getMissionNotification(),
        getFinanceNotification(),
        getFeedbackNotification(),
      ]);

      if (results[0].status === 'fulfilled') setMissionNoti(results[0].value);
      if (results[1].status === 'fulfilled') setFinanceNoti(results[1].value);
      if (results[2].status === 'fulfilled') setFeedbackNoti(results[2].value);
    } catch (error) {
      console.error('알림 데이터 로딩 실패:', error);
    }
  };

  useEffect(() => {
    fetchNotificationData();
  }, []);

  const handleToggle = async () => {
    try {
      const response = await toggleNotification();
      const newToggleState = response.enabled;

      setIsOn(newToggleState);
      localStorage.setItem(NOTIFICATION_TOGGLE_KEY, JSON.stringify(newToggleState));

      if (newToggleState) {
        await fetchNotificationData();
      }
    } catch (error) {
      console.error('알림 설정 변경 실패:', error);
      alert('설정 변경 중 오류가 발생했습니다.');
    }
  };

  const renderCardContent = (notiData: NotificationCard | null, emptyMsg: string) => {
    if (!isOn) {
      return <S.EmptyText>알림이 꺼져있어요.</S.EmptyText>;
    }

    if (!notiData) {
      return <S.EmptyText>{emptyMsg}</S.EmptyText>;
    }

    return (
      <>
        <S.NotiTitle>{notiData.title}</S.NotiTitle>
        <S.NotiMessage>{notiData.message}</S.NotiMessage>
      </>
    );
  };

  return (
    <>
      <S.UpLine>
        <S.Icons src={back} alt="이전으로" onClick={() => navigate(-1)} />
        알림
      </S.UpLine>

      <S.ToggleSection>
        <span>알림</span>
        <S.ToggleWrapper onClick={handleToggle} $isOn={isOn}>
          <S.ToggleCircle $isOn={isOn} />
        </S.ToggleWrapper>
      </S.ToggleSection>

      <S.RemindingSection>
        <S.N_Section>
          미션 리마인드
          <S.ContentBox>{renderCardContent(missionNoti, '도착한 미션 알림이 없습니다.')}</S.ContentBox>
        </S.N_Section>

        <S.N_Section>
          학습 리마인드
          <S.ContentBox>{renderCardContent(financeNoti, '도착한 학습 알림이 없습니다.')}</S.ContentBox>
        </S.N_Section>

        <S.N_Section>
          피드백 알림
          <S.ContentBox>{renderCardContent(feedbackNoti, '도착한 피드백 알림이 없습니다.')}</S.ContentBox>
        </S.N_Section>
      </S.RemindingSection>
    </>
  );
}
