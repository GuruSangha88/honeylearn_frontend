
import { ChevronLeft, Play, CheckCircle, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
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
    <div className="min-h-screen bg-tutor-dark text-white pt-4">
      <div className="container max-w-6xl mx-auto px-4">
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
            <div className="mt-3 flex items-center gap-1 text-sm text-tutor-purple">
              <span>{topic.completedLessons || 0}/{topic.totalLessons || topic.lessons.length} lessons completed</span>
            </div>
          </div>
          {topic.imageUrl && (
            <div className="h-16 w-16 bg-tutor-dark-gray rounded-full overflow-hidden border-2 border-tutor-purple/30">
              <img src={topic.imageUrl} alt={topic.title} className="h-full w-full object-cover" />
            </div>
          )}
        </div>
        
        {/* Lessons List */}
        <div className="glass-card p-4 mb-8">
          <h2 className="text-xl font-semibold mb-4">Lessons</h2>
          <div className="space-y-4">
            {topic.lessons.map((lesson) => (
              <div key={lesson.id} className="glass-card p-4 hover:border-tutor-purple/40 transition duration-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-lg">{lesson.title}</h3>
                    <p className="text-sm text-gray-400">{lesson.description}</p>
                    <div className="text-xs text-tutor-gray mt-1">
                      {Math.floor(lesson.duration / 60)} minutes • {lesson.sections.length} sections
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {lesson.completed ? (
                      <CheckCircle className="text-green-500" size={20} />
                    ) : (
                      <Circle className="text-gray-500" size={20} />
                    )}
                    <Button 
                      onClick={() => navigate(`/lesson/${lesson.id}`)}
                      size="sm" 
                      className="gap-1 bg-tutor-purple hover:bg-tutor-dark-purple"
                    >
                      <Play size={14} />
                      {lesson.completed ? 'Replay' : 'Start'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;

