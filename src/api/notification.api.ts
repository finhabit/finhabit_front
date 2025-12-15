import instance from '@/api/axios';
import type { NotificationCard, NotificationToggleResponse } from '@/types/notification';

export const toggleNotification = async (): Promise<NotificationToggleResponse> => {
  const res = await instance.patch<NotificationToggleResponse>('/notifications/settings/toggle');
  return res.data;
};

export const getNotificationSettings = async (): Promise<{ enabled: boolean }> => {
  const res = await instance.get<{ enabled: boolean }>('/notifications/settings');
  return res.data;
};

export const getMissionNotification = async (): Promise<NotificationCard> => {
  const res = await instance.get<NotificationCard>('/notifications/mission');
  return res.data;
};

export const getFinanceNotification = async (): Promise<NotificationCard> => {
  const res = await instance.get<NotificationCard>('/notifications/finance');
  return res.data;
};

export const getFeedbackNotification = async (): Promise<NotificationCard> => {
  const res = await instance.get<NotificationCard>('/notifications/feedback');
  return res.data;
};
