import { angkor } from "./fonts";

const Header = () => {
    return (
      <div className="text-center mb-4">
        <p className={` text-xl text-gray-700 dark:text-gray-300 ${angkor.className} `}>
        Calculate Your <span className="text-blue-400">Savings </span> Goals Based on <span className="text-yellow-400">Salary</span>  and <span className="text-red-400">Expenses</span> 
        </p>
        <p className={`text-xl text-gray-700 dark:text-gray-300 ${angkor.className} `}>to Reach Your Desired <span className="text-purple-400">Amount</span>  Within Your Chosen <span className="text-gray-400">Timeframe</span>.</p>
      </div>
    );
  };
  
  export default Header;