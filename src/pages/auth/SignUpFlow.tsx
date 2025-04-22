
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import ParentSignUpForm from '@/components/auth/ParentSignUpForm';
import StudentInfoForm from '@/components/auth/StudentInfoForm';
import PaywallScreen from '@/components/auth/PaywallScreen';
import { useToast } from "@/hooks/use-toast";

type SignUpStep = 'parent' | 'student' | 'paywall';

const SignUpFlow = () => {
  const [currentStep, setCurrentStep] = useState<SignUpStep>('parent');
  const [session, setSession] = useState<any>(null);
  const [parentId, setParentId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for existing session on load
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      if (data.session?.user?.id) {
        setParentId(data.session.user.id);
      }
    };
    
    checkSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        if (currentSession?.user?.id) {
          setParentId(currentSession.user.id);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleParentSignUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      // After successful signup, move to the student information step
      if (data.user) {
        setParentId(data.user.id);
        setCurrentStep('student');
      }
    } catch (error: any) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const handleStudentInfo = async (studentData: { name: string; birthDate: Date }) => {
    try {
      if (!parentId) {
        // Try to get the session again as a fallback
        const { data } = await supabase.auth.getSession();
        if (!data.session?.user?.id) {
          throw new Error('User not authenticated');
        }
        setParentId(data.session.user.id);
      }
      
      console.log("Adding student with parent ID:", parentId);
      
      const { error } = await supabase
        .from('students')
        .insert([
          {
            parent_id: parentId,
            name: studentData.name,
            birth_date: studentData.birthDate.toISOString().split('T')[0],
          },
        ]);

      if (error) {
        console.error('Error adding student:', error);
        throw error;
      }
      
      setCurrentStep('paywall');
    } catch (error: any) {
      console.error('Error adding student:', error);
      toast({
        title: "Error",
        description: `Failed to save student information: ${error.message}`,
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {currentStep === 'parent' && (
          <ParentSignUpForm onSubmit={handleParentSignUp} />
        )}
        {currentStep === 'student' && (
          <StudentInfoForm onSubmit={handleStudentInfo} />
        )}
        {currentStep === 'paywall' && (
          <PaywallScreen />
        )}
      </div>
    </div>
  );
};

export default SignUpFlow;
