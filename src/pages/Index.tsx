
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-tutor-dark text-white p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center mb-6">
          <img src="/lovable-uploads/ea337c81-3a2b-4dfb-8f64-733dca433902.png" alt="HoneyLearn" className="h-16" />
        </div>
        <h1 className="text-3xl font-bold">Welcome to HoneyLearn</h1>
        <p className="mt-2 text-gray-300">The fun way for kids to learn essential life skills</p>
        
        <div className="mt-8 space-y-4">
          <Link to="/signup" className="block w-full">
            <Button size="lg" className="bg-[#FCE20B] hover:bg-[#FCE20B]/90 text-black text-base font-bold w-full">
              Try for free
            </Button>
          </Link>
          
          <Link to="/login" className="block w-full">
            <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 w-full">
              Login to your account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
