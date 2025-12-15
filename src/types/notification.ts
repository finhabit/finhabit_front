export interface NotificationCard {
  type: 'MISSION' | 'FINANCE' | 'FEEDBACK' | string; // 필요시 확장
  title: string;
  message: string;
  createdAt: string;
}

export interface NotificationToggleResponse {
  enabled: boolean;
}
