
import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { DailyGoal } from '@/types';
import { Button } from '@/components/ui/button';

interface GoalTrackerProps {
  dailyGoals: DailyGoal[];
}

const GoalTracker = ({ dailyGoals }: GoalTrackerProps) => {
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  
  // Sort daily goals by date
  const sortedGoals = [...dailyGoals].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Get the current week goals
  const currentWeekGoals = sortedGoals.slice(0, 7);
  
  const currentGoal = sortedGoals[0];
  const currentGoalPercentage = currentGoal 
    ? Math.min(Math.round((currentGoal.completedMinutes / currentGoal.targetMinutes) * 100), 100)
    : 0;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };
  
  return (
    <div className="glass-card p-5">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Daily Goal Tracker</h3>
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant={viewMode === 'week' ? 'default' : 'outline'} 
            onClick={() => setViewMode('week')}
            className={viewMode === 'week' ? 'bg-tutor-purple hover:bg-tutor-dark-purple' : ''}
          >
            Week
          </Button>
          <Button 
            size="sm" 
            variant={viewMode === 'month' ? 'default' : 'outline'} 
            onClick={() => setViewMode('month')}
            className={viewMode === 'month' ? 'bg-tutor-purple hover:bg-tutor-dark-purple' : ''}
          >
            Month
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="text-tutor-purple" size={18} />
          <span>Today's Goal: {currentGoal?.completedMinutes || 0}/{currentGoal?.targetMinutes || 15} minutes</span>
        </div>
        <span className="text-sm font-medium text-tutor-purple">{currentGoalPercentage}%</span>
      </div>
      
      <div className="h-2 w-full bg-gray-700 rounded-full mb-6">
        <div 
          className="h-full bg-gradient-to-r from-tutor-purple to-tutor-blue rounded-full"
          style={{ width: `${currentGoalPercentage}%` }}
        ></div>
      </div>
      
      <div className="space-y-4">
        {(viewMode === 'week' ? currentWeekGoals : sortedGoals).map((goal) => (
          <div key={goal.date} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="text-gray-400" size={16} />
              <span className="text-sm">{formatDate(goal.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-32 h-1.5 bg-gray-700 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-tutor-purple to-tutor-blue rounded-full"
                  style={{ 
                    width: `${Math.min((goal.completedMinutes / goal.targetMinutes) * 100, 100)}%` 
                  }}
                ></div>
              </div>
              <span className="text-xs text-gray-400">
                {goal.completedMinutes}/{goal.targetMinutes}m
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalTracker;
