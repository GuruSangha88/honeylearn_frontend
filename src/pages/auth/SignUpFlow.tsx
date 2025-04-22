
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import ParentSignUpForm from '@/components/auth/ParentSignUpForm';
import StudentInfoForm from '@/components/auth/StudentInfoForm';
import PaywallScreen from '@/components/auth/PaywallScreen';

type SignUpStep = 'parent' | 'student' | 'paywall';

const SignUpFlow = () => {
  const [currentStep, setCurrentStep] = useState<SignUpStep>('parent');
  const [parentId, setParentId] = useState<string>('');
  const navigate = useNavigate();

  const handleParentSignUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      if (data.user) {
        setParentId(data.user.id);
        setCurrentStep('student');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const handleStudentInfo = async (studentData: { name: string; birthDate: Date }) => {
    try {
      const { error } = await supabase
        .from('students')
        .insert([
          {
            parent_id: parentId,
            name: studentData.name,
            birth_date: studentData.birthDate.toISOString().split('T')[0],
          },
        ]);

      if (error) throw error;
      setCurrentStep('paywall');
    } catch (error) {
      console.error('Error adding student:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-tutor-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
