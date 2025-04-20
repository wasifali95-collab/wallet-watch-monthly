
type TransactionType = 'income' | 'expense';

type CategoryType = 
  | 'Food'
  | 'Transportation'
  | 'Housing'
  | 'Utilities'
  | 'Entertainment'
  | 'Healthcare'
  | 'Shopping'
  | 'Other'
  | 'Salary'
  | 'Investment'
  | 'Freelance';

type CurrencyType = 
  | 'USD'
  | 'PKR'
  | 'EUR'
  | 'GBP';

interface CurrencyConfig {
  code: CurrencyType;
  symbol: string;
  label: string;
}

interface Transaction {
  id?: string;
  type: TransactionType;
  amount: number;
  category: CategoryType;
  description: string;
  date: string;
  currency: CurrencyType;
}

export type { Transaction, TransactionType, CategoryType, CurrencyType, CurrencyConfig };
