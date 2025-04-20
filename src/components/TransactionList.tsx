
import { format } from 'date-fns';
import { Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import type { Transaction } from '@/types/transaction';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const getCurrencySymbol = (currency: string) => {
  const symbols: Record<string, string> = {
    PKR: 'Rs',
    USD: '$',
    EUR: '€',
    GBP: '£',
  };
  return symbols[currency] || currency;
};

const TransactionList = ({ transactions, onDelete }: TransactionListProps) => {
  if (transactions.length === 0) {
    return <p className="text-center text-gray-500">No transactions yet</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      <div className="space-y-2">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
          >
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">{transaction.category}</span>
                <span className={`font-semibold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {getCurrencySymbol(transaction.currency)}{transaction.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{transaction.description || transaction.category}</span>
                <span>{format(new Date(transaction.date), 'MMM d, yyyy')}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 text-gray-400 hover:text-red-600"
              onClick={() => transaction.id && onDelete(transaction.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
