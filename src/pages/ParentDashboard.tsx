
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockParent } from '@/data/mockData';
import SubscriptionCard from '@/components/parent/SubscriptionCard';
import { supabase } from '@/integrations/supabase/client';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/signup');
      } else {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  if (isLoading) {
    return <div className="min-h-screen bg-tutor-dark text-white flex items-center justify-center">
      <p>Loading...</p>
    </div>;
  }
  
  return (
    <div className="min-h-screen bg-tutor-dark text-white">
      <div className="container max-w-6xl mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold gradient-text">Parent Dashboard</h1>
            <p className="text-gray-400">Welcome back, {mockParent.name}</p>
          </div>
          <Button
            variant="ghost"
            className="flex items-center gap-1 text-gray-300 hover:text-white"
            onClick={() => navigate('/')}
          >
            <ChevronLeft size={20} />
            Back to Student View
          </Button>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SubscriptionCard />
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users size={18} className="text-tutor-purple" />
                  Account Details
                </CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Email Address</p>
                    <p className="text-sm text-gray-400">{mockParent.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Account Created</p>
                    <p className="text-sm text-gray-400">May 1, 2025</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">Change Password</Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">Delete Account</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
