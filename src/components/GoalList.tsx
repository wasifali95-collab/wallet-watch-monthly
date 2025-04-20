
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PiggyBankIcon, EditIcon, TrashIcon, PlusIcon } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import type { Goal } from '@/types/goal';

// Helper function to get currency symbol
const getCurrencySymbol = (currencyCode: string): string => {
  switch (currencyCode) {
    case 'USD': return '$';
    case 'PKR': return 'Rs';
    case 'EUR': return '€';
    case 'GBP': return '£';
    default: return currencyCode;
  }
};

// Format date to locale string
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

// Calculate days remaining until deadline
const getDaysRemaining = (deadline: string): number => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

interface GoalListProps {
  goals: Goal[];
  onDelete: (id: string) => void;
  onUpdate: (goal: Goal) => void;
}

const GoalList = ({ goals, onDelete, onUpdate }: GoalListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [contributionAmount, setContributionAmount] = useState<string>('');

  const handleContribute = (goal: Goal) => {
    const amount = parseFloat(contributionAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    const newCurrentAmount = goal.currentAmount + amount;
    
    if (newCurrentAmount > goal.targetAmount) {
      toast.error("Contribution would exceed the target amount");
      return;
    }
    
    onUpdate({
      ...goal,
      currentAmount: newCurrentAmount
    });
    
    setContributionAmount('');
    toast.success(`Added ${getCurrencySymbol(goal.currency)}${amount} to your goal!`);
  };

  if (goals.length === 0) {
    return (
      <div className="text-center py-10">
        <PiggyBankIcon className="mx-auto h-12 w-12 text-gray-400 mb-3" />
        <h3 className="text-lg font-medium">No savings goals yet</h3>
        <p className="text-gray-500 mt-2">Create your first savings goal to start tracking your progress.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Your Saving Goals</h2>
      {goals.map((goal) => {
        const progressPercentage = Math.round((goal.currentAmount / goal.targetAmount) * 100);
        const daysRemaining = getDaysRemaining(goal.deadline);
        
        return (
          <Card key={goal.id} className="p-4 relative">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium">{goal.name}</h3>
              <div className="space-x-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setEditingId(editingId === goal.id ? null : goal.id || '')}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onDelete(goal.id || '')}
                >
                  <TrashIcon className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
            
            {goal.description && (
              <p className="text-sm text-gray-500 mb-2">{goal.description}</p>
            )}
            
            <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
              <div>
                <span className="text-gray-500">Target: </span>
                <span className="font-medium">{getCurrencySymbol(goal.currency)}{goal.targetAmount}</span>
              </div>
              <div>
                <span className="text-gray-500">Saved: </span>
                <span className="font-medium">{getCurrencySymbol(goal.currency)}{goal.currentAmount}</span>
              </div>
              <div>
                <span className="text-gray-500">Remaining: </span>
                <span className="font-medium">{getCurrencySymbol(goal.currency)}{(goal.targetAmount - goal.currentAmount).toFixed(2)}</span>
              </div>
              <div>
                <span className="text-gray-500">Deadline: </span>
                <span className="font-medium">{formatDate(goal.deadline)}</span>
              </div>
            </div>
            
            <div className="mb-2">
              <Progress value={progressPercentage} className="h-3" />
              <div className="flex justify-between mt-1 text-xs">
                <span>{progressPercentage}% completed</span>
                <span>{daysRemaining} days remaining</span>
              </div>
            </div>
            
            {editingId === goal.id && (
              <div className="mt-3 pt-3 border-t">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor={`contribution-${goal.id}`} className="sr-only">
                      Add contribution
                    </Label>
                    <Input
                      id={`contribution-${goal.id}`}
                      type="number"
                      placeholder="Add amount"
                      value={contributionAmount}
                      onChange={(e) => setContributionAmount(e.target.value)}
                      min="0.01"
                      step="0.01"
                    />
                  </div>
                  <Button 
                    onClick={() => handleContribute(goal)}
                  >
                    Add
                  </Button>
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default GoalList;
