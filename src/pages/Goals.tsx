
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import GoalForm from '@/components/GoalForm';
import GoalList from '@/components/GoalList';
import type { Goal } from '@/types/goal';

const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  const addGoal = (goal: Goal) => {
    setGoals([...goals, { ...goal, id: Date.now().toString() }]);
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const updateGoal = (updatedGoal: Goal) => {
    setGoals(goals.map(g => g.id === updatedGoal.id ? updatedGoal : g));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#1A1F2C]">Savings Goals</h1>
      
      <div className="max-w-md mx-auto space-y-6">
        <Card className="p-4 shadow-lg">
          <GoalForm onSubmit={addGoal} />
        </Card>

        <Card className="p-4 shadow-lg">
          <GoalList 
            goals={goals}
            onDelete={deleteGoal}
            onUpdate={updateGoal}
          />
        </Card>
      </div>
    </div>
  );
};

export default Goals;
