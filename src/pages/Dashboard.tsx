
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users } from 'lucide-react';
import Header from '@/components/Header';
import TopicCard from '@/components/TopicCard';
import GoalTracker from '@/components/GoalTracker';
import { Button } from '@/components/ui/button';
import { mockTopics, currentStudent } from '@/data/mockData';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'topics' | 'recommended'>('topics');
  
  // Calculate daily goal percentage
  const todayGoal = currentStudent.dailyGoals[currentStudent.dailyGoals.length - 1];
  const dailyGoalPercentage = todayGoal 
    ? Math.min(Math.round((todayGoal.completedMinutes / todayGoal.targetMinutes) * 100), 100)
    : 0;

  return (
    <div className="min-h-screen bg-tutor-dark text-white pt-4">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header with Student Info */}
        <Header student={currentStudent} dailyGoalPercentage={dailyGoalPercentage} />
        
        {/* Navigation Tabs */}
        <div className="flex justify-between items-center mt-8 mb-6">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'topics'
                  ? 'bg-tutor-purple text-white'
                  : 'text-gray-400 hover:bg-gray-800'
              }`}
              onClick={() => setActiveTab('topics')}
            >
              My Topics
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'recommended'
                  ? 'bg-tutor-purple text-white'
                  : 'text-gray-400 hover:bg-gray-800'
              }`}
              onClick={() => setActiveTab('recommended')}
            >
              Recommended
            </button>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => navigate('/parents')}
            className="gap-1"
          >
            <Users size={16} /> Parent Dashboard
          </Button>
        </div>
        
        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {(activeTab === 'topics' ? mockTopics : [mockTopics[0]]).map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
        
        {/* Continue Learning */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <BookOpen className="text-tutor-purple" size={20} />
              Continue Learning
            </h2>
            <Button 
              variant="link" 
              size="sm" 
              className="text-tutor-purple"
              onClick={() => navigate('/curriculum')}
            >
              See All
            </Button>
          </div>
          <div className="glass-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-lg">Multiplication Fundamentals</h3>
                <p className="text-sm text-gray-400">Learn how to multiply numbers</p>
              </div>
              <Button 
                size="sm" 
                className="bg-tutor-purple hover:bg-tutor-dark-purple"
                onClick={() => navigate('/lesson/1003')}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
        
        {/* Goal Tracker */}
        <GoalTracker dailyGoals={currentStudent.dailyGoals} />
      </div>
    </div>
  );
};

export default Dashboard;
