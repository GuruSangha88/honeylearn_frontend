
import { Button } from "@/components/ui/button";

const PaywallScreen = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Choose Your Plan</h2>
        <p className="mt-2 text-gray-400">Start your learning journey today</p>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6 space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white">Premium Plan</h3>
          <p className="text-4xl font-bold text-[#FCE20B] mt-2">$29/month</p>
          <p className="text-gray-400 mt-2">Full access to all features</p>
        </div>
        
        <ul className="space-y-3">
          <li className="flex items-center text-white">
            <svg className="w-5 h-5 text-[#FCE20B] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Unlimited lessons
          </li>
          <li className="flex items-center text-white">
            <svg className="w-5 h-5 text-[#FCE20B] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Progress tracking
          </li>
          <li className="flex items-center text-white">
            <svg className="w-5 h-5 text-[#FCE20B] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Personalized learning path
          </li>
        </ul>
        
        <Button className="w-full bg-[#FCE20B] hover:bg-[#FCE20B]/90 text-black font-bold">
          Start Premium Plan
        </Button>
      </div>
    </div>
  );
};

export default PaywallScreen;
