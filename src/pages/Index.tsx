
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PiggyBankIcon, WalletIcon } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <h1 className="text-3xl font-bold text-center mb-10 text-[#1A1F2C]">Wallet Watch</h1>
      
      <div className="max-w-md mx-auto space-y-8">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4 text-center">Welcome to Wallet Watch</h2>
          <p className="text-gray-600 mb-6 text-center">
            Track your expenses and save for your goals all in one place.
          </p>
          
          <div className="grid grid-cols-1 gap-4">
            <Link to="/transactions" className="block">
              <div className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <WalletIcon className="h-6 w-6 text-primary mr-3" />
                <div>
                  <h3 className="font-medium">Track Transactions</h3>
                  <p className="text-sm text-gray-500">Manage your income and expenses</p>
                </div>
              </div>
            </Link>
            
            <Link to="/goals" className="block">
              <div className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <PiggyBankIcon className="h-6 w-6 text-primary mr-3" />
                <div>
                  <h3 className="font-medium">Savings Goals</h3>
                  <p className="text-sm text-gray-500">Set and track your saving targets</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-500">
          <p>Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
