
import { CurrencyType } from './transaction';

export interface Goal {
  id?: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  currency: CurrencyType;
  deadline: string; // ISO date string
  description?: string;
  createdAt: string; // ISO date string
}
