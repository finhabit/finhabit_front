export type PaymentType = 'CARD' | 'CASH' | 'ETC';

export interface CategoryStat {
  categoryId: number;
  categoryName: string;
  amount: number;
  percent: number;
}

export interface LedgerItem {
  ledgerId: number;
  categoryId: number;
  categoryName: string;
  type: string;
  amount: number;
  merchant: string;
  date: string;
  payment: string;
}

export interface LedgerHomeResponse {
  date: string;
  totalIncome: number;
  totalExpense: number;

  today: {
    totalExpense: number;
    ledgers: LedgerItem[];
  };
  todayCategories: CategoryStat[];

  monthSummary: {
    year: number;
    month: number;
    totalExpense: number;
    categories: CategoryStat[];
  };
}

export interface CreateLedgerRequest {
  categoryId: number;
  amount: number;
  merchant: string;
  date: string;
  payment: PaymentType | string;
}

export interface UpdateLedgerRequest extends Partial<CreateLedgerRequest> {}
