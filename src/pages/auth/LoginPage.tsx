
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { WifiOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { TermsOfServiceLink, PrivacyPolicyLink } from '../../components/auth/AuthLinks';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      // Clean up any existing auth state
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
      
      // Try to sign out globally first to clear any existing sessions
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      
      // Sign in with email/password
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      if (data.user) {
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in",
        });
        
        // Force complete page reload to ensure fresh state
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      console.error('Error logging in:', err);
      
      if (err.message === 'Failed to fetch') {
        setError('Network connection error. Please check your internet connection and try again.');
      } else if (err.message.includes('auth') || err.message.includes('password') || err.message.includes('email')) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError(err.message || 'An error occurred during login');
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
            <img 
              src="/lovable-uploads/ea337c81-3a2b-4dfb-8f64-733dca433902.png" 
              alt="HoneyLearn" 
              className="h-12" 
            />
          </div>
          <h2 className="text-3xl font-bold text-white">Login to your account</h2>
        </div>
        
        {error && (
          <Alert variant="destructive" className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500">
            {error.includes('Network') && <WifiOff className="h-4 w-4 mr-2" />}
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
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
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-400">
          By logging in, you agree to our{' '}
          <TermsOfServiceLink /> and <PrivacyPolicyLink />.
        </div>

        <div className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
