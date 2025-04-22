
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ParentSignUpFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
}

const ParentSignUpForm = ({ onSubmit }: ParentSignUpFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(email, password);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Create Your Account</h2>
        <p className="mt-2 text-gray-400">Join HoneyLearn and start your child's learning journey</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-gray-800 border-gray-700 text-white"
            placeholder="Enter your email"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password" className="text-white">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-gray-800 border-gray-700 text-white"
            placeholder="Create a password"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#FCE20B] hover:bg-[#FCE20B]/90 text-black font-bold"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Continue'}
        </Button>
      </form>
    </div>
  );
};

export default ParentSignUpForm;
