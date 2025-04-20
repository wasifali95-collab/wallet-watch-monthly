
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Transaction, TransactionType, CategoryType, CurrencyType } from '@/types/transaction';

interface TransactionFormProps {
  onSubmit: (transaction: Transaction) => void;
}

const TransactionForm = ({ onSubmit }: TransactionFormProps) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<CategoryType>('Food');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState<CurrencyType>('PKR');

  const categories: CategoryType[] = type === 'expense' 
    ? ['Food', 'Transportation', 'Housing', 'Utilities', 'Entertainment', 'Healthcare', 'Shopping', 'Other']
    : ['Salary', 'Investment', 'Freelance', 'Other'];

  const currencies = [
    { code: 'PKR', symbol: 'Rs', label: 'Pakistani Rupee' },
    { code: 'USD', symbol: '$', label: 'US Dollar' },
    { code: 'EUR', symbol: '€', label: 'Euro' },
    { code: 'GBP', symbol: '£', label: 'British Pound' },
  ] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    onSubmit({
      type,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString(),
      currency,
    });

    setAmount('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <Select value={type} onValueChange={(value: TransactionType) => setType(value)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="expense">Expense</SelectItem>
            <SelectItem value="income">Income</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex-1 flex gap-2">
          <Select value={currency} onValueChange={(value: CurrencyType) => setCurrency(value)}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map(({ code, label }) => (
                <SelectItem key={code} value={code}>{code}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1"
          />
        </div>
      </div>

      <Select value={category} onValueChange={(value: CategoryType) => setCategory(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button type="submit" className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]">
        <Plus className="mr-2 h-4 w-4" /> Add Transaction
      </Button>
    </form>
  );
};

export default TransactionForm;
