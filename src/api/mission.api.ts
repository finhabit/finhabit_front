import instance from '@/api/axios';
import type { TodayMissionResponse, MissionCheckResponse, MissionArchiveResponse } from '@/types/mission';

export const getTodayMission = async (): Promise<TodayMissionResponse> => {
  const res = await instance.get<TodayMissionResponse>('/mission/today');
  return res.data;
};

export const checkMission = async (userMissionId: number): Promise<MissionCheckResponse> => {
  const res = await instance.post<MissionCheckResponse>(`/mission/${userMissionId}/check`);
  return res.data;
};

export const uncheckMission = async (userMissionId: number): Promise<MissionCheckResponse> => {
  const res = await instance.post<MissionCheckResponse>(`/mission/${userMissionId}/uncheck`);
  return res.data;
};

export const getMissionArchive = async (): Promise<MissionArchiveResponse> => {
  const res = await instance.get<MissionArchiveResponse>('/mission/archive');
  return res.data;
};
