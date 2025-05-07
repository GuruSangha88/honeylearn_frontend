
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the signup page to start the process 
    navigate('/signup');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-tutor-dark text-white">
      <p>Redirecting to signup page...</p>
    </div>
  );
};

export default Index;
