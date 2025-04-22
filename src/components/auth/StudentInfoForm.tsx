
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface StudentInfoFormProps {
  onSubmit: (data: { name: string; birthDate: Date }) => Promise<void>;
}

const StudentInfoForm = ({ onSubmit }: StudentInfoFormProps) => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit({
        name,
        birthDate: new Date(birthDate),
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save student information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Student Information</h2>
        <p className="mt-2 text-gray-400">Tell us about your child</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">Student's Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-gray-800 border-gray-700 text-white"
            placeholder="Enter student's name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="birthDate" className="text-white">Birth Date</Label>
          <Input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#FCE20B] hover:bg-[#FCE20B]/90 text-black font-bold"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Continue'}
        </Button>
      </form>
    </div>
  );
};

export default StudentInfoForm;
