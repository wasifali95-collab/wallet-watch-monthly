
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Card } from "@/components/ui/card";

interface MonthlyReportProps {
  transactions: Transaction[];
}

const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#0EA5E9', '#F97316', '#D946EF', '#33C3F0', '#8B5CF6'];

const MonthlyReport = ({ transactions }: MonthlyReportProps) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
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
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-4 bg-green-50">
          <div className="text-sm text-gray-600">Total Income</div>
          <div className="text-xl font-bold text-green-600">${totalIncome.toFixed(2)}</div>
        </Card>
        
        <Card className="p-4 bg-red-50">
          <div className="text-sm text-gray-600">Total Expenses</div>
          <div className="text-xl font-bold text-red-600">${totalExpenses.toFixed(2)}</div>
        </Card>
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
