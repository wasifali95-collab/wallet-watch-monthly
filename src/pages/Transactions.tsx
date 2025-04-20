
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import MonthlyReport from '@/components/MonthlyReport';
import type { Transaction } from '@/types/transaction';

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now().toString() }]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#1A1F2C]">Transactions</h1>
      
      <div className="max-w-md mx-auto space-y-6">
        <Card className="p-4 shadow-lg">
          <TransactionForm onSubmit={addTransaction} />
        </Card>

        <Card className="p-4 shadow-lg">
          <MonthlyReport transactions={transactions} />
        </Card>

        <Card className="p-4 shadow-lg">
          <TransactionList 
            transactions={transactions}
            onDelete={deleteTransaction}
          />
        </Card>
      </div>
    </div>
  );
};

export default Transactions;
