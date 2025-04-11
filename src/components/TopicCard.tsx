
import { ChevronRight } from 'lucide-react';
import { Topic } from '@/types';
import { useNavigate } from 'react-router-dom';

interface TopicCardProps {
  topic: Topic;
}

const TopicCard = ({ topic }: TopicCardProps) => {
  const navigate = useNavigate();
  
  // Calculate total lessons and completed lessons
  const totalLessons = topic.totalLessons || topic.lessons.length;
  const completedLessons = topic.completedLessons || topic.lessons.filter(lesson => lesson.completed).length;
  
  // Calculate progress percentage
  const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div 
      className="glass-card p-5 cursor-pointer hover:border-tutor-purple/40 transition duration-200"
      onClick={() => navigate(`/topic/${topic.id}`)}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-xl mb-1">{topic.title}</h2>
          <p className="text-sm text-gray-400">{topic.description}</p>
          <p className="text-xs mt-3 text-tutor-purple">
            {completedLessons}/{totalLessons} lessons completed
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-16 w-16 bg-tutor-dark-gray rounded-full overflow-hidden border-2 border-tutor-purple/30">
            {topic.imageUrl ? (
              <img src={topic.imageUrl} alt={topic.title} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-3xl font-bold text-tutor-purple">
                {topic.title.charAt(0)}
              </div>
            )}
          </div>
          <ChevronRight className="text-tutor-purple" size={20} />
        </div>
      </div>
      
      <div className="mt-4 h-1.5 rounded-full bg-gray-700 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-tutor-purple to-tutor-blue rounded-full" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default TopicCard;
