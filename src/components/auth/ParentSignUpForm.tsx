
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import { TermsOfServiceLink, PrivacyPolicyLink } from './AuthLinks';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { WifiOff } from 'lucide-react';

interface ParentSignUpFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
}

const ParentSignUpForm = ({ onSubmit }: ParentSignUpFormProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      await onSubmit(email, password);
    } catch (err: any) {
      console.error('Error in signup form:', err);
      
      // Handle network errors with a specific message
      if (err.message === 'Failed to fetch') {
        setError('Network connection error. Please check your internet connection and try again.');
      } else {
        setError(err.message || 'An error occurred during sign up');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <svg 
              width="40" 
              height="40" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 20h9"/>
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white">Create your parent account</h2>
        </div>
        
        {error && (
          <Alert variant="destructive" className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500">
            {error.includes('Network') && <WifiOff className="h-4 w-4 mr-2" />}
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <Input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="bg-[#1E1E1E] border-gray-700 text-white placeholder-gray-500"
            />
            <Input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="bg-[#1E1E1E] border-gray-700 text-white placeholder-gray-500"
            />
          </div>
          
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-[#1E1E1E] border-gray-700 text-white placeholder-gray-500"
          />
          
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#1E1E1E] border-gray-700 text-white placeholder-gray-500"
          />

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Continue'}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-400">
          By signing up, you're agreeing to our{' '}
          <TermsOfServiceLink /> and <PrivacyPolicyLink />.
        </div>

        <div className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ParentSignUpForm;
