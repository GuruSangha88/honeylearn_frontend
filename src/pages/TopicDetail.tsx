
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import CourseCard from '@/components/CourseCard';
import { mockTopics, currentStudent } from '@/data/mockData';

const TopicDetail = () => {
  const navigate = useNavigate();
  const { topicId } = useParams();
  
  const topic = mockTopics.find((t) => t.id === topicId);
  
  // Calculate daily goal percentage
  const todayGoal = currentStudent.dailyGoals[currentStudent.dailyGoals.length - 1];
  const dailyGoalPercentage = todayGoal 
    ? Math.min(Math.round((todayGoal.completedMinutes / todayGoal.targetMinutes) * 100), 100)
    : 0;
  
  if (!topic) {
    return (
      <div className="min-h-screen bg-tutor-dark text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Topic Not Found</h1>
          <Button onClick={() => navigate('/curriculum')}>Back to Curriculum</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-tutor-dark text-white">
      <div className="container max-w-6xl mx-auto py-6 px-4">
        {/* Header with Student Info */}
        <Header student={currentStudent} dailyGoalPercentage={dailyGoalPercentage} />
        
        {/* Back Navigation */}
        <div className="mt-8 mb-6">
          <Button
            variant="link"
            className="flex items-center gap-1 text-gray-300 hover:text-white pl-0"
            onClick={() => navigate('/curriculum')}
          >
            <ChevronLeft size={20} />
            Back to Curriculum
          </Button>
        </div>
        
        {/* Topic Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold gradient-text">{topic.title}</h1>
            <p className="text-gray-400">{topic.description}</p>
          </div>
          {topic.imageUrl && (
            <div className="h-16 w-16 bg-tutor-dark-gray rounded-full overflow-hidden border-2 border-tutor-purple/30">
              <img src={topic.imageUrl} alt={topic.title} className="h-full w-full object-cover" />
            </div>
          )}
        </div>
        
        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {topic.courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;
