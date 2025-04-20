
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

interface Transaction {
  id?: string;
  type: TransactionType;
  amount: number;
  category: CategoryType;
  description: string;
  date: string;
}
