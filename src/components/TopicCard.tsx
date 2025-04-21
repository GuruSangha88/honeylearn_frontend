
import { ChevronRight } from 'lucide-react';
import { Topic } from '@/types';
import { useNavigate } from 'react-router-dom';

interface TopicCardProps {
  topic: Topic;
}

const TopicCard = ({ topic }: TopicCardProps) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="glass-card p-5 cursor-pointer hover:border-tutor-purple/40 transition duration-200"
      onClick={() => navigate(`/topic/${topic.id}`)}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-xl mb-1">{topic.title}</h2>
          <p className="text-sm text-gray-400">{topic.description}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-16 w-16 rounded-full overflow-hidden">
            <div className="h-full w-full flex items-center justify-center text-3xl font-bold bg-gradient-to-r from-tutor-purple to-tutor-blue text-white">
              {topic.title.charAt(0)}
            </div>
          </div>
          <ChevronRight className="text-tutor-purple" size={20} />
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
