import instance from '@/api/axios';
import axios from 'axios';
import type { LedgerHomeResponse, CreateLedgerRequest, UpdateLedgerRequest, LedgerItem } from '@/types/ledger';
const ABSOLUTE_LEDGER_URL = 'https://www.finhabit.shop/ledger';
export type LedgerCalendarResponse = LedgerHomeResponse;

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

export const updateLedger = async (ledgerId: number, data: UpdateLedgerRequest): Promise<LedgerItem> => {
  const response = await instance.patch<LedgerItem>(`/ledger/${ledgerId}`, data);
  return response.data;
};

export const deleteLedger = async (ledgerId: number) => {
  const response = await instance.delete(`/ledger/${ledgerId}`);
  return response.data;
};
