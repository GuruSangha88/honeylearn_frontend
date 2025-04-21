
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';
import Header from '@/components/Header';
import TopicCard from '@/components/TopicCard';
import GoalTracker from '@/components/GoalTracker';
import { Button } from '@/components/ui/button';
import { mockTopics, currentStudent } from '@/data/mockData';

const Dashboard = () => {
  const navigate = useNavigate();
  
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
        
        {/* Navigation Header */}
        <div className="flex justify-between items-center mt-8 mb-6">
          <h2 className="text-xl font-semibold">My Topics</h2>
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
          {mockTopics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
        
        {/* Goal Tracker */}
        <GoalTracker dailyGoals={currentStudent.dailyGoals} />
      </div>
    </div>
  );
};

export default Dashboard;
