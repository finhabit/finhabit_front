import axios from './axios';

export interface Knowledge {
  financeId: number;
  cardTitle: string;
  cardContent: string;
  cardLevel: number;
  opendDate: string;
}

export const getTodayKnowledge = async () => {
  const res = await axios.get<Knowledge>('/finance');
  return res.data;
};

export const getKnowledgeList = async (type: 'WEEKLY' | 'MONTHLY'): Promise<Knowledge[]> => {
  const url = type === 'WEEKLY' ? '/finance/week' : '/finance/month';

  const res = await axios.get<Knowledge[]>(url);
  return res.data;
};
