
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Card } from "@/components/ui/card";
import type { Transaction } from '@/types/transaction';

interface MonthlyReportProps {
  transactions: Transaction[];
}

const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#0EA5E9', '#F97316', '#D946EF', '#33C3F0', '#8B5CF6'];

const getCurrencySymbol = (currency: string) => {
  const symbols: Record<string, string> = {
    PKR: 'Rs',
    USD: '$',
    EUR: '€',
    GBP: '£',
  };
  return symbols[currency] || currency;
};

const MonthlyReport = ({ transactions }: MonthlyReportProps) => {
  // Group transactions by currency
  const groupedTransactions = transactions.reduce((acc, t) => {
    if (!acc[t.currency]) {
      acc[t.currency] = { income: 0, expenses: 0 };
    }
    if (t.type === 'income') {
      acc[t.currency].income += t.amount;
    } else {
      acc[t.currency].expenses += t.amount;
    }
    return acc;
  }, {} as Record<string, { income: number; expenses: number }>);

  // Get expense data for the primary currency (first transaction's currency or PKR)
  const primaryCurrency = transactions[0]?.currency || 'PKR';
  
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense' && t.currency === primaryCurrency)
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const pieData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: amount
  }));

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Monthly Overview</h2>
      
      <div className="grid grid-cols-1 gap-4 mb-6">
        {Object.entries(groupedTransactions).map(([currency, { income, expenses }]) => (
          <div key={currency} className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-green-50">
              <div className="text-sm text-gray-600">Total Income ({currency})</div>
              <div className="text-xl font-bold text-green-600">
                {getCurrencySymbol(currency)}{income.toFixed(2)}
              </div>
            </Card>
            
            <Card className="p-4 bg-red-50">
              <div className="text-sm text-gray-600">Total Expenses ({currency})</div>
              <div className="text-xl font-bold text-red-600">
                {getCurrencySymbol(currency)}{expenses.toFixed(2)}
              </div>
            </Card>
          </div>
        ))}
      </div>

      {pieData.length > 0 ? (
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-center text-gray-500">Add expenses to see your spending breakdown</p>
      )}
    </div>
  );
};

export default MonthlyReport;
