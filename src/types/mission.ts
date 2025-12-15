export interface Mission {
  userMissionId: number;
  missionId: number;
  missionContent: string;
  missionLevel: number;
  totalCount: number;
  doneCount: number;
  progress: number;
  completed: boolean;
}

export interface TodayMissionResponse {
  todayMission: Mission | null;
}

export interface MissionCheckResponse extends Mission {}

export interface MissionArchiveItem {
  weekStart: string;
  weekEnd: string;
  missions: Mission[];
}

export type MissionArchiveResponse = MissionArchiveItem[];
