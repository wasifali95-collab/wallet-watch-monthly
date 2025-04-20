
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import type { Goal } from '@/types/goal';
import type { CurrencyType } from '@/types/transaction';

const CURRENCY_OPTIONS = [
  { code: 'USD', symbol: '$', label: 'USD - US Dollar' },
  { code: 'PKR', symbol: 'Rs', label: 'PKR - Pakistani Rupee' },
  { code: 'EUR', symbol: '€', label: 'EUR - Euro' },
  { code: 'GBP', symbol: '£', label: 'GBP - British Pound' },
];

interface GoalFormProps {
  onSubmit: (goal: Goal) => void;
}

const GoalForm = ({ onSubmit }: GoalFormProps) => {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [currency, setCurrency] = useState<CurrencyType>('USD');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !targetAmount || !deadline) {
      toast.error("Please fill out all required fields");
      return;
    }

    const target = parseFloat(targetAmount);
    const current = parseFloat(currentAmount || '0');
    
    if (target <= 0) {
      toast.error("Target amount must be greater than zero");
      return;
    }

    if (current < 0 || current > target) {
      toast.error("Current amount must be between 0 and target amount");
      return;
    }

    const newGoal: Goal = {
      name,
      targetAmount: target,
      currentAmount: current,
      currency,
      deadline,
      description,
      createdAt: new Date().toISOString()
    };

    onSubmit(newGoal);
    
    // Reset form
    setName('');
    setTargetAmount('');
    setCurrentAmount('');
    setCurrency('USD');
    setDeadline('');
    setDescription('');
    
    toast.success("Goal added successfully!");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Add New Saving Goal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Goal Name*</Label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder="New Car, Vacation, Emergency Fund, etc."
            required
          />
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="targetAmount">Target Amount*</Label>
            <Input 
              id="targetAmount" 
              type="number" 
              value={targetAmount} 
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="5000"
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div className="flex-1">
            <Label htmlFor="currentAmount">Current Savings</Label>
            <Input 
              id="currentAmount" 
              type="number" 
              value={currentAmount} 
              onChange={(e) => setCurrentAmount(e.target.value)}
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="currency">Currency</Label>
          <select 
            id="currency"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyType)}
          >
            {CURRENCY_OPTIONS.map(option => (
              <option key={option.code} value={option.code}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <Label htmlFor="deadline">Target Date*</Label>
          <Input 
            id="deadline" 
            type="date" 
            value={deadline} 
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Details about your saving goal..."
            className="min-h-[80px]"
          />
        </div>
        
        <Button type="submit" className="w-full">
          <PlusIcon className="mr-2 h-4 w-4" /> Add Goal
        </Button>
      </form>
    </div>
  );
};

export default GoalForm;
