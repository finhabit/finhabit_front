import axios from './axios';
import type { Knowledge } from '@/types/knowledge';

export const getTodayKnowledge = async () => {
  const res = await axios.get('/knowledge/today');
  return res.data;
};

export const getKnowledgeList = async (type: 'WEEKLY' | 'MONTHLY'): Promise<Knowledge[]> => {
  const res = await axios.get('/knowledge', {
    params: { type },
  });
  return res.data;
};
