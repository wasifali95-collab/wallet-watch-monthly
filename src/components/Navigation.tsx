
import { Link, useLocation } from "react-router-dom";
import { PiggyBankIcon, WalletIcon, HomeIcon } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-10">
      <Link 
        to="/" 
        className={`flex flex-col items-center justify-center w-1/3 py-1 ${isActive('/') ? 'text-primary' : 'text-gray-500'}`}
      >
        <HomeIcon className="h-6 w-6" />
        <span className="text-xs mt-1">Home</span>
      </Link>
      
      <Link 
        to="/transactions" 
        className={`flex flex-col items-center justify-center w-1/3 py-1 ${isActive('/transactions') ? 'text-primary' : 'text-gray-500'}`}
      >
        <WalletIcon className="h-6 w-6" />
        <span className="text-xs mt-1">Transactions</span>
      </Link>
      
      <Link 
        to="/goals" 
        className={`flex flex-col items-center justify-center w-1/3 py-1 ${isActive('/goals') ? 'text-primary' : 'text-gray-500'}`}
      >
        <PiggyBankIcon className="h-6 w-6" />
        <span className="text-xs mt-1">Goals</span>
      </Link>
    </div>
  );
};

export default Navigation;
