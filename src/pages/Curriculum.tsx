import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import TopicCard from '@/components/TopicCard';
import { mockTopics, currentStudent } from '@/data/mockData';

const Curriculum = () => {
  const navigate = useNavigate();
  
  // Calculate daily goal percentage - we keep this for other potential uses
  const todayGoal = currentStudent.dailyGoals[currentStudent.dailyGoals.length - 1];
  const dailyGoalPercentage = todayGoal 
    ? Math.min(Math.round((todayGoal.completedMinutes / todayGoal.targetMinutes) * 100), 100)
    : 0;
  
  return (
    <div className="min-h-screen bg-tutor-dark text-white pt-4">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header with Student Info - removed dailyGoalPercentage prop */}
        <Header student={currentStudent} />
        
        {/* Back Navigation */}
        <Button
          variant="link"
          className="flex items-center gap-1 text-gray-300 hover:text-white pl-0 mt-8 mb-6"
          onClick={() => navigate('/')}
        >
          <ChevronLeft size={20} />
          Back to Dashboard
        </Button>
        
        <h1 className="text-2xl font-semibold mb-6 gradient-text">Curriculum</h1>
        
        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {mockTopics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
