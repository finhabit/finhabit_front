import instance from '@/api/axios';

import type {
  LedgerHomeResponse,
  LedgerCalendarResponse,
  LedgerItem,
  CreateLedgerRequest,
  UpdateLedgerRequest,
} from '@/types/ledger';

export const getLedgerHome = async (date?: string): Promise<LedgerHomeResponse> => {
  const params = date ? { date } : {};
  const response = await instance.get<LedgerHomeResponse>('/ledger/home', {
    params,
  });
  return response.data;
};

export const getLedgerCalendar = async (year: string, month: string): Promise<LedgerCalendarResponse> => {
  const response = await instance.get<LedgerCalendarResponse>('/ledger/calendar', {
    params: { year, month },
  });
  return response.data;
};

export const createLedger = async (data: CreateLedgerRequest): Promise<LedgerItem> => {
  const response = await instance.post<LedgerItem>('/ledger', data);
  return response.data;
};

export const modifyLedger = async (ledgerId: number, data: UpdateLedgerRequest): Promise<LedgerItem> => {
  const response = await instance.patch<LedgerItem>(`/ledger/${ledgerId}`, data);
  return response.data;
};

export const deleteLedger = async (ledgerId: number): Promise<void> => {
  await instance.delete(`/ledger/${ledgerId}`);
};
